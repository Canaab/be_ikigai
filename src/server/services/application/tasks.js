module.exports = {
	actions: {
		"#tasks/server-health": {
			params: {},

			handler(ctx) {
				return ctx.call("$node.health")
					.then(stats => !!stats)
			}
		},

		"#tasks/get-client-mongo": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#edge/is-connected")
			}
		}
	}
}