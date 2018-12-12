module.exports = {
	actions: {
		"#entity/create": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return {
					fb_id: ctx.params.fb_id,
					// name: ctx.params.name,
					abilities: [],
					aspirations: [],
					applications: [],
					environments: [],
					recall_date: new Date(0)
				}
			}
		}
	}
}