const moment = require("moment");
require("moment-round");

module.exports = {
	actions: {
		"#edge/login": {
			params: {},

			handler(ctx) {
				return ctx.call("@user.#tasks/sign-token");
			}
		},

		"#edge/create-user": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#tasks/verify-and-create-user", ctx.params);
			}
		},

		"#edge/report-conversation": {
			params: {
				fb_id: "string",
				value: "string"
			},

			handler(ctx) {
				const { fb_id, value } = ctx.params;

				const date = moment(value)
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