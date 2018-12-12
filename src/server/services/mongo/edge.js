const has = require("lodash/has");

module.exports = {
	actions: {
		"#edge/init-db": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/init")
			}
		},

		"#edge/is-connected": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/check-connection")
					.then(isConnected => ({ isConnected }))
			}
		},

		"#edge/get-user": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				const { params } = ctx;

				return ctx.call("@mongo.#tasks/get-user", params)
			}
		},

		"#edge/insert-user": {
			params: {
				user: "object"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/insert-one-user", ctx.params)
			}
		},

		"#edge/update-user": {
			params: {
				fb_id: "string",
				update: "object"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/update-user", ctx.params);
			}
		},

		"#edge/get-users-to-recall": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-users-filtered-on-recall-date")
			}
		}
	}
}