module.exports = {
	actions: {
		"#gateway/webhook": {
			params: {},

			handler(ctx) {
				return ctx.call("@chatbot.#edge/receive", ctx.params)
			}
		}
	}
}