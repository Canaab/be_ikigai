module.exports = {
	actions: {
		"#gateway/verify-api-key": {
			params: {},

			handler(ctx) {
				return ctx.call("@auth.#edge/verify")
			}
		}
	}
}