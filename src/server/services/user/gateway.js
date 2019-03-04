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

		"#gateway/link": {
			params: {
				m_id: "string",
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#edge/link", ctx.params);
			}
		},

		"#gateway/get-result": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#edge/get-result", ctx.params);
			}
		}
	}
}