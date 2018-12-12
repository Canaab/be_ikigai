module.exports = {
	actions: {
		"#edge/verify": {
			params: {},

			handler(ctx) {
				const { headers } = ctx.meta;

				if(headers["x-api-dialogflow"])
					return ctx.call("@auth.#tasks/verify-uuid-dialogflow")

				else if(headers["x-api-bearer"]) {
					return ctx.call("@auth.#tasks/verify-jwt")
				}

				else
					throw new Error("No token has been provided.");
			}
		},

		"#edge/sign": {
			params: {},

			handler(ctx) {
				return ctx.call("@auth.#tasks/sign")
					.then(jwt => ({
						token: "Bearer " + jwt
					}))
			}
		}
	}
}