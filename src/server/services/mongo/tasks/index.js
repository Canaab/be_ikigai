const { MongoClient } = require('mongodb');

// URL de connexion locale
const url = process.env.NODE_ENV === 'production' ? "mongodb://mongo:27017" : "mongodb://localhost:27017"

module.exports = {
	mixins: [
		require('./init'),
		require('./user'),
		require('./jobs')
	],

	actions: {
		"#tasks/get-client": {
			params: {},

			handler() {
				const opts = {
					useNewUrlParser: true,
					logger: console
				}

				return MongoClient.connect(url, opts)
			}
		},

		"#tasks/check-connection": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-client")
					.then(client => {
						if(client) {
							const { isConnected } = client;
							client.close();
							return isConnected;
						}
						return false;
					})
			}
		},

		"#tasks/get-speech": {
			params: {
				name: "string"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-client")
					.then(client => client.db('ikigai')
						.collection('speech')
						.findOne({ 'name': ctx.params.name }, { 'value': 1 })
						.finally(() => client.close())
					)
			}
		}
	}
}