const request = require('axios');

module.exports = {
	actions: {
		"#tasks/request": {
			params: {},

			handler(ctx) {
				const { method, path, data } = ctx.params;

				return request({
					method: method || 'POST',
					url: `http://localhost:5000/${path || 'process'}`,
					data
				})
			}
		},

		"#tasks/process": {
			params: {
				user_data: "string"
			},

			handler(ctx) {
				return ctx.call("@ikigai.#tasks/request",{ data: ctx.params })
			}
		},

		"#tasks/get-health": {
			handler(ctx) {
				return ctx.call("@ikigai.#tasks/request", { method: 'GET', path: 'health' })
					.catch(e => {
						this.logger.error(e);
						return { data: { status: 'offline' }};
					})
			}
		}
	}
}