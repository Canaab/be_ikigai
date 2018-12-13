const has = require('lodash/has');
const moment = require('moment');
const { request } = require("axios");
require('moment-round');

const access_token = "EAADSMy0PGFIBAA8U9ZCj4EKq2VhLPLZA7PYn2rXRlxxGM9cdrZBWqmZBfmYXrhd0onDTShimy85E7ZBKQvOgF1gRW2luRO7eOMXj4f5RZAC2ltJnRzIbOZA0gUUBT3qhiuYhdxRZBHYMW79xq3a5Telw7MDZBhz5wklCJVvn34cE3VwZDZD"

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

		"#tasks/send-recall": {
			params: {
				users: "array"
			},

			handler(ctx) {
				const { users } = ctx.params;

				const send_p = users.map(user => request(
						{
							method: "POST",
							url: `https://graph.facebook.com/v2.6/me/messages?access_token=${access_token}`,
							data: {
								messaging_type: "UPDATE",
								recipient: {
									"id": user.fb_id
								},
								message: {
									text: "Alors, on reprend ? :)",
									quick_replies: [
										{
											content_type:"text",
											title:"C'est parti !",
											payload: ""
										},
										{
											content_type:"text",
											title:"Plus tard",
											payload: ""
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
				receptionDate: 'number',
				intent: 'string',
				contexts: 'array',
				q_params: 'object'
			},

			handler(ctx) {
				const { fb_id, message, receptionDate, intent, contexts, q_params } = ctx.params;

				switch (intent) {
				case 'StartIntent':
					return ctx.call('@user.#edge/create-user', { fb_id })

				case 'EoDIntent - later':
					if(has(q_params, 'date-time')) {
						const date = q_params['date-time'];

						return ctx.call("@user.#edge/report-conversation", { fb_id, value: date })
							.then(() => {

								return {
									fulfillmentMessages: [
										{
											quickReplies : {
												title: `Très bien ! Je te recontacte ${message.toLowerCase()} !`,
												quickReplies: [
													'Reprendre maintenant'
												]
											}
										}
									]
								}
							})
					}

				default:
					return {};
				}
			}
		}
	}
}