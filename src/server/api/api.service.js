const ApiGateway = require('moleculer-web');

module.exports = {
	name: "RestAPI",

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
				path: "/status/",
				aliases: {
					"GET health": "application.health",
					"GET db": "access.db"
				}
			},

			// Public routes
			{
				path: "/public/",

				aliases: {
					"GET login": "access.login",
				}
			},

			// Private routes
			{
				bodyParsers: {
					json: true
				},

				authorization: true,

				path: "/private/",

				aliases: {
					"POST exemple": "service.action",
				}
			}
		]
	},

	methods: {
		authorize(ctx, route, req, res) {
			return ctx.call('auth.verify', req.body)
				.then(response => {
					console.log(response);
					return Promise.resolve(ctx);
				})
		}
	}
};