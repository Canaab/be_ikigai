module.exports = {
	name: "@ikigai",

	mixins: [
		require('./gateway'),
		require('./edge'),
		require('./tasks'),
		require('./repository'),
		require('./factory')
	]
}