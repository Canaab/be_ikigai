module.exports = {
	actions: {
		// "#tasks/sign-token": {
		// 	params: {},
		//
		// 	handler(ctx) {
		// 		return ctx.call("@auth.#edge/sign")
		// 			.catch(err => { throw new Error(err.toString()); })
		// 	}
		// },

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

		"#tasks/update-recall-date": {
			params: {
				fb_id: "string",
				value: "number"
			},

			handler(ctx) {
				return ctx.call("@user.#factory/update-recall-date", ctx.params)
			}
		},

		// "#tasks/set-score": {
		// 	params: {
		// 		fb_id: "string",
		// 		score: "number"
		// 	},
		//
		// 	handler(ctx) {
		// 		return ctx.call("@mongo.#edge/update-user-forces", ctx.params)
		// 	}
		// }
	}
}