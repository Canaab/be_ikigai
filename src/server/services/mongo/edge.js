module.exports = {
	actions: {
		/*
			DB
		 */
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

		/*
			USER
		 */

		"#edge/get-user": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-user", ctx.params)
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

		"#edge/quick-update-user": {
			params: {
				update: "object"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/quick-update-user", ctx.params)
					.then(res => res.value)
			}
		},

		"#edge/link-user-ids": {
			params: {
				fb_id: "string",
				m_id: "string"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/link-user-ids", ctx.params);
			}
		},

		"#edge/get-users-to-recall": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-users-filtered-on-recall-date")
			}
		},

		/*
			JOBS
		 */

		"#edge/get-jobs": {
			params: {
				ids: "array"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-jobs", ctx.params);
			}
		},

		/*
			CHATBOT
		 */

		"#edge/get-speech": {
			params: {
				name: "string"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-speech", ctx.params)
					.then(speech => {
						if(!speech)
							return ctx.params.name + " text is not implemented.";

						return speech.value;
					})
			}
		}
	}
}