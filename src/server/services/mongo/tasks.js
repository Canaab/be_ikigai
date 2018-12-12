const { MongoClient } = require('mongodb');
const moment = require('moment');
// URL de connexion locale
const url = process.env.DOCKERMODE ? 'mongodb://mongo:27017' : 'mongodb://localhost:27017';

const EXCLUDE_ID = {projection: {'_id': 0}};
const RETURN_UPDATED = { returnOriginal: false};
const EPOCH = new Date(0);

module.exports = {
	actions: {
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

		"#tasks/init": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-client")
					.then(client => {
						const db = client.db('ikigai')
						const opts = {
							// OPTIONS
						};

						return db.createCollection("users", opts) // Does not override existing collection
							.then(collection => collection
								.countDocuments()
									.then(count => this.logger.info(`#Mongo -> Existing users : ${count}`))
									.finally(() => client.close()))
					})
			}
		},

		"#tasks/get-user": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-client")
					.then(client => client.db("ikigai")
						.collection("users")
						.find(null, EXCLUDE_ID)
						.filter(ctx.params)
						.toArray()
							.then(res => res[0])
							.finally(() => client.close())
					)
			}
		},

		"#tasks/insert-one-user": {
			params: {
				user: "object"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-client")
					.then(client => client.db("ikigai")
						.collection("users")
						.insertOne(ctx.params.user)
							.then(res => {
								if(!res.result.ok)
									throw new Error("Inserting user error.")

								return ctx.params.user;
							})
						.finally(() => client.close())
					)
			}
		},

		"#tasks/update-user": {
			params: {
				fb_id: "string",
				update: "object"
			},

			handler(ctx) {
				const { fb_id, update } = ctx.params;

				return ctx.call("@mongo.#tasks/get-client")
					.then(client => client.db("ikigai")
						.collection("users")
						.findOneAndUpdate({ fb_id }, { "$set": update }, RETURN_UPDATED)
						.finally(() => client.close())
					)
			}
		},

		"#tasks/get-users-filtered-on-recall-date": {
			params: {},

			handler(ctx) {
				const now = new Date();

				return ctx.call("@mongo.#tasks/get-client")
					.then(client => client.db("ikigai")
						.collection("users")
						.find(null, EXCLUDE_ID)
						.filter({
							'recall_date': {
								'$lte': now,
								'$ne': EPOCH
							}
						})
						.toArray()
						.finally(() => client.close())
					)
			}
		},

		"#tasks/get-client": {
			params: {},

			handler(ctx) {
				const opts = {
					useNewUrlParser: true,
					logger: console
				}

				return MongoClient.connect(url, opts)
			}
		},
	}
}