module.exports = {
	actions: {
		"#edge/verify": {
			params: {},

			handler(ctx) {
				const { headers } = ctx.meta;

				if(headers["x-api-bearer"]) {
					return ctx.call("@auth.#tasks/verify-jwt")
				}
				else throw new Error("No token has been provided.");
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
		},

		"#edge/verify-token-and-respond": {
			params: {},

			handler(ctx) {

				const hub = {
					mode: ctx.params['hub.mode'],
					token: ctx.params['hub.verify_token'],
					challenge: ctx.params['hub.challenge']
				}

				return ctx.call("@auth.#tasks/verify-fb-token", {hub})
					.then(() => parseInt(hub.challenge))
			}
		}
	}
}