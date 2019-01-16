module.exports = {
	actions: {
		"#entity/create": {
			params: {
				fb_id: "string"
			},

			handler(ctx) {
				return {
					fb_id: ctx.params.fb_id,
					progress: 0,
					data: [
						{ name: "10yo_memory", value: "" },
						{ name: "animal_visualisation", value: "" },
						{ name: "perso_inspi", value: "" },
						{ name: "wrath", value: "" },
						{ name: "better_world", value: "" },
						{ name: "friend_feedback", value: "" }
					],
					recall_date: new Date(0)
				}
			}
		}
	}
}