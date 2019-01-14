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
				fb_id: "string",
				update: "object"
			},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/quick-update-user", ctx.params);
			}
		},

		// "#edge/update-user-forces": {
		// 	params: {
		// 		fb_id: "string",
		// 		score: "number"
		// 	},
		//
		// 	handler(ctx) {
		// 		return ctx.call("@mongo.#tasks/update-user-forces", ctx.params)
		// 	}
		// },

		"#edge/get-users-to-recall": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#tasks/get-users-filtered-on-recall-date")
			}
		},

		// "#edge/count-questions-forces": {
		// 	params: {},
		//
		// 	handler(ctx) {
		// 		return ctx.call("@mongo.#tasks/count-questions-forces")
		// 	}
		// },

		// "#edge/get-question": {
		// 	params: {
		// 		step: "number"
		// 	},
		//
		// 	handler(ctx) {
		// 		return ctx.call("@mongo.#tasks/get-question-from-step", ctx.params )
		// 			.then(question => question.title)
		// 	}
		// },

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