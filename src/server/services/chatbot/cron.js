const Cron = require('moleculer-cron');

const env = process.env.ENV;

module.exports = {
	mixins: [Cron],

	crons: [
		{
			name: 'Reminder',
			cronTime: '0 * * * *',

			onTick: function () {
				this.call('@chatbot.#tasks/checkup');
			}
		}
	]
}
