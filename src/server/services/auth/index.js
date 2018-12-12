module.exports = {
	name: "@auth",

	mixins: [
		require('./edge'),
		require('./gateway'),
		require('./tasks'),
	]
}