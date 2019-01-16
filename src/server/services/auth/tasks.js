const jwt = require('jsonwebtoken');

const { private_key, fb_challenge_token } = require('../../config/config.json');

module.exports = {
	actions: {
		"#tasks/sign": {
			params: {},

			handler(ctx) {
				return jwt.sign(ctx.params, private_key, {expiresIn: '1d'});
			}
		},

		"#tasks/verify-jwt": {
			params: {},

			handler(ctx) {
				const bearer = ctx.meta.headers["x-api-bearer"];

				if(bearer.startsWith("Bearer "))
					return jwt.verify(bearer.slice(7), private_key, function (error, decoded) {
						if(error)
							throw new Error("Invalid JWToken.");
						else {
							ctx.meta.data = {};
							Object.keys(decoded).forEach(key => {
								ctx.meta.data[key] = decoded[key];
							})
						}
					});
				else throw new Error("Invalid JWToken.");
			}
		},

		"#tasks/verify-fb-token": {
			params: {
				hub: "object"
			},

			handler(ctx) {
				const { mode, token, challenge } = ctx.params;

				if(mode && token) {
					if(mode === 'subscribe' && token === fb_challenge_token) {
						this.logger.info("Challenged by Facebook | Challenge :", challenge);
						return challenge;
					} else throw new Error("Wrong token provided.");
				}
			}
		}
	}
};