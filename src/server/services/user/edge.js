const moment = require("moment");
require("moment-round");

module.exports = {
	actions: {
		"#edge/login": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#tasks/check-user-completed", ctx.params)
					.then(completed => ({
						completed,
						message: completed ? "Ikigai done" : "Ikigai not created or unfinished"
					}))
			}
		},

		"#edge/get-result": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#tasks/find-jobs", ctx.params)
					.then(res => ctx.call("@mongo.#edge/get-jobs", { ids: res })
						.then(jobs => ({ jobs })))
			}
		},

		"#edge/create": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#tasks/verify-and-create", ctx.params);
			}
		},

		"#edge/get": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#repository/get", ctx.params);
			}
		},

		"#edge/update": {
			params: {
				fb_id: "string",
				update: "object"
			},

			handler(ctx) {
				return ctx.call("@user.#factory/update", ctx.params);
			}
		},

		"#edge/report-conversation": {
			params: {
				fb_id: "string",
				value: "object"
			},

			handler(ctx) {
				const { fb_id, value } = ctx.params;

				const date = value
					.ceil(1, "hour")
					// .floor(1, "minute")
					.utc()
					.valueOf();

				return ctx.call("@user.#tasks/update-recall-date", { fb_id, value: date });
			}
		},

		"#edge/reset-recall-date": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				const { fb_id } = ctx.params;

				return ctx.call("@user.#tasks/update-recall-date", { fb_id, value: 0 })
			}
		}
	}
}