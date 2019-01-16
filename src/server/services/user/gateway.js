module.exports = {
	actions: {
		"#gateway/login": {
			params: {},

			handler(ctx) {
				return ctx.call("@user.#edge/login");
			}
		},

		"#gateway/test": {
			params: {},

			handler(ctx) {
				return ctx.call('@user.#edge/test');
			}
		}
	}
}