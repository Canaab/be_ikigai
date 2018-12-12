module.exports = {
	actions: {
		"#repository/get": {
			params: {
				// id
				// fb_id
				// name
			},

			handler(ctx) {
				return ctx.call("@mongo.#edge/get-user", ctx.params)
			}
		}
	}
}