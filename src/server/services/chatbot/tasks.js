const moment = require('moment');
const { request } = require("axios");
const Promise = require('bluebird');
require('moment-round');

const { page_access_token } = require('../../../../config/config.json');
const starter = [/^bonjour$/, /^salut$/, /^hello$/, /^démarrer$/, /^demarrer$/];

module.exports = {
	actions: {
		"#tasks/checkup": {
			params: {},

			handler(ctx) {
				this.logger.info('Checking up recall at', moment().format('HH:mm:ss'));
				return ctx.call("@mongo.#edge/get-users-to-recall")
					.then(users => ctx.call("@chatbot.#tasks/send-recall", { users })
						.then(() => users.forEach(user => ctx.call("@user.#edge/reset-recall-date", user))))
			}
		},

		"#tasks/send": {
			params: {
				recipient: "object",
				text: "string"
			},

			handler(ctx) {
				const { recipient, text, replies } = ctx.params;
				const pre = {
					method: "POST",
					url: `https://graph.facebook.com/v2.6/me/messages?access_token=${page_access_token}`
				}
				const message = { text };

				if(!ctx.params.no_quit_button)
					replies.push({ title: '➡️Quitter', intent: 'EoD-intent'} );

				// 'quick_replies' rather not defined than empty
				if(replies.length > 0)
					message.quick_replies = replies.map(qr => ({
						title: qr.title,
						content_type: "text",
						payload: qr.intent || '',
					}));

				return Promise
					.resolve([
						// Mark as seen
						{
							...pre,
							data: {
								recipient,
								sender_action: "mark_seen"
							}
						},
						// // Typing ON
						{
							...pre,
							data: {
								recipient,
								sender_action: "typing_on"
							}
						},
						// Response
						{
							...pre,
							data: { recipient, message }
						}
					])
					.mapSeries((query) => request(query))
			}
		},

		"#tasks/send-recall": {
			params: {
				users: "array"
			},

			handler(ctx) {
				const { users } = ctx.params;

				const send_p = users.map(user => request(
						{
							method: "POST",
							url: `https://graph.facebook.com/v2.6/me/messages?access_token=${page_access_token}`,
							data: {
								messaging_type: "UPDATE",
								recipient: {
									"id": user.fb_id
								},
								message: {
									text: "Alors, on reprend ? 😉",
									quick_replies: [
										{
											content_type:"text",
											title:"🤘C'est parti !",
											payload: "continue-intent"
										},
										{
											content_type:"text",
											title:"🕐Plus tard",
											payload: "EoD-intent"
										}
									]
								}
							}
						}
					))

				return Promise.all(send_p)
					.then(responses => {
						if(responses.some(res => res.status !== 200))
							throw new Error("Failed to send message");
					})
			}
		},

		"#tasks/handle": {
			params: {
				fb_id: 'string',
				message: 'string',
				intent: 'string',
				nlp: 'object'
			},

			handler(ctx) {
				const { fb_id, message, intent, nlp } = ctx.params;
				const params = {
					speech_name: '',
					recipient: { id: fb_id },
					text: '',
					replies: []
				};
				let call = () => Promise.resolve();

				// Determining which speech needs to be sent.
				if(!intent.length) {
					// Start of discussion
					if(starter.some(s => message.toLowerCase().match(s))) {
						this.setUpMainMenu(params, "text_hello");
						call = () => ctx.call('@user.#edge/create', { fb_id });
					} else {
						call = () => ctx.call('@user.#edge/get', { fb_id })
							.then(user => {
								const update = {
									"$inc": {progress: 1},
									"$set": {[`data.${user.progress}.value`]: message}
								};

								return ctx.call("@user.#edge/update", {fb_id, update})
									.then(updated => {
										if(updated.progress >= 5)
											this.setUpLinkToApp(params);
										else
											this.setUpWellReceivedMenu(params);
									})
							});
					}
				} else {
					switch (intent) {
					case 'qna-intent':
						call = () => ctx.call('@user.#edge/get', { fb_id }).then(user => this.setUpQnAMenu(params, user.progress));
						break;
					case 'info-ikigai-intent':
						this.setUpMainMenu(params, "text_info_ikigai");
						break;
					case 'info-project-intent':
						this.setUpMainMenu(params, "text_info_project");
						break;
					case 'EoD-intent':
						this.setUpDateMenu(params);
						break;
					case 'continue-intent':
						this.setUpMainMenu(params, "text_main_menu");
						call = () => ctx.call('@user.#edge/reset-recall-date', { fb_id });
						break;
					case 'main-menu-intent':
						this.setUpMainMenu(params, "text_main_menu");
						break;
					case 'date-intent/1h':
					case 'date-intent/tomorroy':
					case 'date-intent/never':
						switch (intent.split('/')[1]) {
						case '1h':
							this.setUpWaitingMenu(params, true);
							call = () => ctx.call('@user.#edge/report-conversation', { fb_id, value: moment().add(1, 'hour') })
							break;
						case 'tomorroy':
							this.setUpWaitingMenu(params, true);
							call = () => ctx.call('@user.#edge/report-conversation', { fb_id, value: moment().add(1, 'day') })
							break;
						case 'never':
							this.setUpWaitingMenu(params, false)
							break;
						}
						break;
					}
				}

				return call()
					.then(() => {
						if(params.speech_name.length === 0) // Unable to understand demand
							this.setUpMainMenu(params, "text_misunderstood");

						return ctx.call("@mongo.#edge/get-speech", { name: params.speech_name })
								.then(text => {
									params.text = text;
									delete params.speech_name;

									this.logger.info("DATA TO SEND :", params);
									return ctx.call("@chatbot.#tasks/send", params);
								})
						}
					)
			}
		}
	},

	methods: {
		setUpMainMenu(params, speech_name) {
			params.speech_name = speech_name;
			params.replies = [
				{
					title: '🤘Commençons !',
					intent: 'qna-intent'
				},
				{
					title: "🇯🇵IKIGAI ?",
					intent: 'info-ikigai-intent'
				},
				{
					title: "🤖Qui es-tu ?",
					intent: 'info-project-intent'
				},
			]
		},

		setUpDateMenu(params) {
			params.speech_name = "text_eod";
			params.no_quit_button = true;
			params.replies = [
				{
					title: "🕐Dans 1h",
					intent: 'date-intent/1h'
				},
				{
					title: '🌙Demain',
					intent: 'date-intent/tomorroy'
				},
				{
					title: '😢Jamais',
					intent: 'date-intent/never'
				},
				{
					title: '❌Annuler',
					intent: 'main-menu-intent'
				}
			]
		},

		setUpWellReceivedMenu(params) {
			params.speech_name = "text_well_received";
			params.replies = [
				{
					title: '👉Continuer',
					intent: 'qna-intent'
				},
				{
					title: '🌀Menu Principal',
					intent: 'main-menu-intent'
				}
			]
		},

		setUpQnAMenu(params, step) {
			params.replies = [
				{
					title: '🌀Menu Principal',
					intent: 'main-menu-intent'
				}
			];

			switch(step) {
			case 0: // le kiff à 10 ans
				params.speech_name = "text_10yo_enjoy";
				break;
			case 1: // Si j'étais un animal
				params.speech_name = "text_be_animal";
				break;
			case 2: // Personnages inspirants
				params.speech_name = "text_perso_inspi";
				break;
			case 3: // Ce qui me met en colère
				params.speech_name = "text_wrath";
				break;
			case 4: // Le Monde irait mieux si...
				params.speech_name = "text_better_world";
				break;
			case 5: // Demande à un ami
				params.speech_name = "text_friend_feedback";
				break;

			default:
				this.setUpLinkToApp(params);
			}
		},

		setUpLinkToApp(params) {
			params.speech_name = "text_link_to_app";
			params.replies = [];
		},

		setUpWaitingMenu(params, recall) {
			params.no_quit_button = true;

			if(recall) {
				params.speech_name = 'text_recall';
				params.replies = [
					{
						title: '👋Reprendre',
						intent: 'continue-intent'
					}
				]
			} else {
				params.speech_name = 'text_never_recall';
			}
		}
	}
}