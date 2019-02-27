module.exports = {
	actions: {
		"#gateway/login": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#edge/login", ctx.params);
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