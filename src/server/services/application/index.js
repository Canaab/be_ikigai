module.exports = {
	name: "@application",

	mixins: [
		require("./gateway"),
		require("./edge"),
		require("./tasks")
	]
}