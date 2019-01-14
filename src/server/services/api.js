const ApiGateway = require('moleculer-web');

module.exports = {
	name: "@api",

	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,

		cors: {
			// Configures the Access-Control-Allow-Origin CORS header.
			origin: "*",
			// Configures the Access-Control-Allow-Methods CORS header.
			methods: ["GET", "PATCH", "OPTIONS", "POST", "PUT", "DELETE"],
			// Configures the Access-Control-Allow-Headers CORS header.
			allowedHeaders: ["Content-Type"],
			// Configures the Access-Control-Expose-Headers CORS header.
			exposedHeaders: [],
			// Configures the Access-Control-Allow-Credentials CORS header.
			credentials: false,
			// Configures the Access-Control-Max-Age CORS header.
			maxAge: 3600
		},

		routes: [
			// Get information on server status
			{
				path: "/status",
				aliases: {
					"GET /health": "@application.#gateway/get-server-health",
					"GET /db": "@application.#gateway/get-db-health"
				}
			},

			// Public routes
			{
				path: "/public",

				aliases: {
					"GET /login": "@user.#gateway/login"
				}
			},

			// Private routes
			{
				bodyParsers: {
					json: true
				},

				authorization: true,

				path: "/private",

				aliases: {
					"POST /test": "@user.#gateway/test",
				}
			},

			// Webhook
			{
				bodyParsers: {
					json: true
				},

				path: '/webhook',

				authorization: true,

				aliases: {
					"POST /": "@chatbot.#gateway/webhook",
					"GET /": "@auth.#gateway/respond-to-challenge"
				}
			}
		]
	},

	methods: {
		authorize(ctx, route, req, res) {
			if(req._body)
				ctx.params = req.body;
			else
				ctx.params = req.query;

			return Promise.resolve(ctx);
			// ctx.meta.headers = {};
			// Object.keys(req.headers).forEach(key => ctx.meta.headers[key] = req.headers[key]);
			// return ctx.call('@auth.#gateway/verify-api-key')
			// 	.then(() => Promise.resolve(ctx));
		}
	}
};