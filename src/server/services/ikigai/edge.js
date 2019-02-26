module.exports = {
	actions: {
		"#edge/get-health": {
			handler(ctx) {
				return ctx.call('@ikigai.#tasks/get-health')
					.then(res => res.data)
			}
		}
	}
}