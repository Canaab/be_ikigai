module.exports = {
	name: "@user",

	mixins: [
		require('./gateway'),
		require('./edge'),
		require('./tasks'),
		require('./entity'),
		require('./factory'),
		require('./repository')
	]
}