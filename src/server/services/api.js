const ApiGateway = require('moleculer-web');
const has = require('lodash/has');

module.exports = {
	name: "@api",

	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT || 3000,

		path: '/api',

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
					"GET /db": "@application.#gateway/get-db-health",
					"GET /flask": "@ikigai.#gateway/get-flask-health"
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
					"POST /login": "@user.#gateway/login",
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
			},
			// fallback route /
			{
				path: "",

				aliases: {
					"GET /": "@application.#gateway/get"
				}
			}
		]
	},

	methods: {
		authorize(ctx, route, req, res) {
			if(has(req, 'query') && Object.keys(req.query).length > 0)
				ctx.params = req.query;
			else
				ctx.params = req.body;

			return Promise.resolve(ctx);
		}
	}
};