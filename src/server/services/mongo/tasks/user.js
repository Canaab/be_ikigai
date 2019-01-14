const EXCLUDE_ID = {projection: {'_id': 0}};
const RETURN_UPDATED = {returnOriginal: false};
const EPOCH = new Date(0);

module.exports = {
	actions: {
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

		"#tasks/quick-update-user": {
			params: {
				fb_id: "string",
				update: "object"
			},

			handler(ctx) {
				const { fb_id, update } = ctx.params;

				return ctx.call("@mongo.#tasks/get-client")
					.then(client => client.db("ikigai")
						.collection("users")
						.findOneAndUpdate({ fb_id }, update, RETURN_UPDATED)
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
		}
	}
}