module.exports = {
	actions: {
		"#gateway/get-flask-health": {
			handler(ctx) {
				return ctx.call('@ikigai.#edge/get-health')
			}
		}
	}
}