module.exports = {
	actions: {
		"#edge/get-health": {
			handler(ctx) {
				return ctx.call('@ikigai.#tasks/get-health')
					.then(res => res.data)
			}
		},

		"#edge/process": {
			params: {
				user: "object"
			},

			handler(ctx) {
				const user_data = ctx.params.user.data.reduce((acc, cur) => acc + ' ' + cur.value, "");

				return ctx.call("@ikigai.#tasks/process", { user_data })
					.then(res => Object.entries(res.data.processed)
						.map(([id, accuracy]) => ({id: parseInt(id), accuracy}))
						.sort((a, b) => b.accuracy - a.accuracy)
					)
			}
		}
	}
}