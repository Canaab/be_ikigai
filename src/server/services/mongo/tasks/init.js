const speech_doc = require('../../../seeds/speech.json');

module.exports = {
	actions: {
		"#tasks/init": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-client")
					.then(client => {
						const db = client.db('ikigai')
						const opts = {
							// OPTIONS
						};

						return ctx.broker.mcall([
							{ action: "@mongo.#tasks/init-user-collection", params: { db, opts } },
							{ action: "@mongo.#tasks/init-ressources-collection", params: { db, opts, name: "speech", document: speech_doc } },
						]).then(() => client.close())
					})
			}
		},

		"#tasks/init-user-collection": {
			params: {
				db: "object"
			},

			handler(ctx) {
				const { db, opts } = ctx.params;

				return db.createCollection("users", opts)
					.then(collection => collection
						.countDocuments()
						.then(count => this.logger.info(`#Mongo -> Existing users : ${count}`))
					)
			}
		},

		"#tasks/init-ressources-collection": {
			params: {
				db: "object",
				name: "string",
				document: "array"
			},

			handler(ctx) {
				const { db, opts, name, document } = ctx.params;

				return db.dropCollection(name)
					.then(() => { this.logger.info(`#Mongo -> Collection '${name}' had been dropped.`); })
					.catch(() => { this.logger.info(`#Mongo -> Collection '${name}' does not exist.`); })
					.finally(() => {
						this.logger.info(`#Mongo -> Creating '${name}' collection...`);
						return db.createCollection(name, opts)
							.then(collection => collection.insertMany(document))
					})
			}
		}
	}
}