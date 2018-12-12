module.exports = {
	actions: {
		"#gateway/get-server-health": {
			params: {},

			handler(ctx) {
				return ctx.call('@application.#edge/get-server-health')
			}
		},

		"#gateway/get-db-health": {
			params: {},

			handler(ctx) {
				return ctx.call("@application.#edge/get-mongo-health")
			}
		}
	}
}