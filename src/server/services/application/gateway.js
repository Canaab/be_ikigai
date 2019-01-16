const serveStatic = require('serve-static');
const fs = require('fs');

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
		},

		"#gateway/get": {
			handler(ctx) {
				ctx.meta.$responseType = 'text/html';
				return Buffer.from(`
					<html lang="fr">
					<head>
						<meta charset="UTF-8">
						<title>IsenKigAI server</title>
					</head>
					<body>
						<h1>Hello World!</h1>
					</body>
					</html>
				`);
			}
		}
	}
}