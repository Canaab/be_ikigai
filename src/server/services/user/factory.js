module.exports = {
	actions: {
		"#factory/insert": {
			params: {
				user: "object"
			},

			handler(ctx) {
				return ctx.call("@mongo.#edge/insert-user", ctx.params);
			}
		},

		"#factory/update": {
			params: {
				fb_id: "string",
				update: "object"
			},

			handler(ctx) {
				return ctx.call("@mongo.#edge/quick-update-user", ctx.params);
			}
		},

		"#factory/update-recall-date": {
			params: {
				fb_id: "string",
				value: "number"
			},

			handler(ctx) {
				const { fb_id, value } = ctx.params;
				const opts = {
					fb_id,
					update: {
						"$set": {
							recall_date: new Date(value)
						}
					}
				};

				return ctx.call("@mongo.#edge/quick-update-user", opts);
			}
		}
	}
}