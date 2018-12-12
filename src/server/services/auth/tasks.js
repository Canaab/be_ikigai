const jwt = require('jsonwebtoken');

const private_key = "4e6a353121d4896af4e1a8e925836400e7a09fd9bd9748bfe70536e16bec3b5e";
const uuid_dialogflow = "67873a7c-57fe-424c-ad9b-6f7f3ba438fd";

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

		"#tasks/verify-uuid-dialogflow": {
			params: {},

			handler(ctx) {
				if(ctx.meta.headers["x-api-dialogflow"] !== uuid_dialogflow)
					throw new Error("Invalid DialogFlow uuid.");
			}
		}
	}
};