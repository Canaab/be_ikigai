const MongoClient = require('mongodb').MongoClient;

// URL de connexion locale
const url = process.env.DOCKERMODE ? 'mongodb://mongo:27017' : 'mongodb://localhost:27017';

module.exports = {

	name: 'db',

	actions: {

		health() {
			return this.connect()
				.then(client => ({
					error: !client,
					payload: client ? client.isConnected() : ('Failed to connect to server ' + url)
				}))
		}
	},

	methods: {
		connect() {
			return new Promise(resolve => {
				MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => resolve(client))
			})
		}
	}
}