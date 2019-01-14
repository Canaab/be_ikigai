module.exports = {
	actions: {
		"#repository/get": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@mongo.#edge/get-user", ctx.params)
			}
		}
	}
}