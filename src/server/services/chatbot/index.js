module.exports = {
	name: '@chatbot',

	mixins: [
		require('./cron'),

		require("./gateway"),
		require("./edge"),
		require("./tasks"),
		// require("./repository"),
		// require("./entity"),
		// require("./factory")
	]
}