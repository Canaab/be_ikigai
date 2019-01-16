module.exports = {
	actions: {
		"#gateway/verify-api-key": {
			params: {},

			handler(ctx) {
				return ctx.call("@auth.#edge/verify")
			}
		},

		"#gateway/respond-to-challenge": {
			params: {},

			handler(ctx) {
				return ctx.call("@auth.#edge/verify-token-and-respond", ctx.params)
			}
		}
	}
}