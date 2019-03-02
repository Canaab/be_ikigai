module.exports = {
	actions: {

		"#tasks/verify-and-create": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#repository/get", ctx.params)
					.then(user_db => user_db ?
						ctx.call("@user.#factory/update-recall-date", { fb_id: user_db.fb_id, value: 0 })
						: ctx.call("@user.#entity/create", ctx.params)
							.then(new_user => ctx.call("@user.#factory/insert", { user: new_user }))
					)
			}
		},

		"#tasks/check-user-completed": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call('@user.#repository/get', ctx.params)
					.then(user_db =>
						user_db // Must exist
						&& user_db.progress === user_db.data.length) // Have to completed discussion
			}
		},

		"#tasks/find-jobs": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return ctx.call("@user.#repository/get", ctx.params)
					.then(user => {
						if(user.result.length > 0)
							return user.result;
						else
							return ctx.call("@ikigai.#edge/process", { user })
								.then(result => {
									const params = {
										...ctx.params,
										update: {
											'$set': { 'result': result }
										}
									};

									ctx.call("@mongo.#edge/quick-update-user", params);

									return result;
								})
					})
			}
		},

		"#tasks/update-recall-date": {
			params: {
				fb_id: "string",
				value: "number"
			},

			handler(ctx) {
				return ctx.call("@user.#factory/update-recall-date", ctx.params)
			}
		}
	}
}