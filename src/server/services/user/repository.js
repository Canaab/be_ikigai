const has = require("lodash/has");

module.exports = {
	actions: {
		"#repository/get": {
			params: {},

			handler(ctx) {
				return ctx.call("@mongo.#edge/get-user", ctx.params)
			}
		}
	}
}