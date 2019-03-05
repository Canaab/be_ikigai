const has = require("lodash/has");

const EXCLUDE_ID = {projection: {'_id': 0}};
const RETURN_UPDATED = {returnOriginal: false};
const EPOCH = new Date(0);

module.exports = {
	actions: {
		"#tasks/get-user": {
			params: {},

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
				update: "object"
			},

			handler(ctx) {
				const { update } = ctx.params;
				const query = {};

				if(has(ctx.params, "m_id"))
					query.m_id = ctx.params.m_id;
				else if (has(ctx.params, "fb_id"))
					query.fb_id = ctx.params.fb_id

				return ctx.call("@mongo.#tasks/get-client")
					.then(client => client.db("ikigai")
						.collection("users")
						.findOneAndUpdate(query, update, RETURN_UPDATED)
						.finally(() => client.close())
					)
			}
		},

		"#tasks/link-user-ids": {
			params: {
				fb_id: "string",
				m_id: "string"
			},

			handler(ctx) {
				const { fb_id, m_id } = ctx.params;

				return ctx.call("@mongo.#tasks/get-client")
					.then(client => client.db("ikigai")
						.collection("users")
						.findOneAndUpdate({ '$or': [{fb_id}, {m_id}]}, { '$set': ctx.params }, RETURN_UPDATED)
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