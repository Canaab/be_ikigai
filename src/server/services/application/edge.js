module.exports = {
	actions: {
		"#edge/get-server-health": {
			params: {},

			handler(ctx) {
				return ctx.call("@application.#tasks/server-health")
					.then(isUp => ({ isUp }))
			}
		},

		"#edge/get-mongo-health": {
			params: {},

			handler(ctx) {
				return ctx.call("@application.#tasks/get-client-mongo")
			}
		}
	}
}