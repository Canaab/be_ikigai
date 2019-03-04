module.exports = {
	actions: {
		"#entity/create": {
			params: {},

			handler(ctx) {
				return {
					m_id: ctx.params.m_id || "",
					fb_id: ctx.params.fb_id || "",
					name: "",
					progress: 0,
					answering: false,
					data: [
						{ name: "10yo_memory", value: "" },
						{ name: "animal_visualisation", value: "" },
						{ name: "perso_inspi", value: "" },
						{ name: "wrath", value: "" },
						{ name: "better_world", value: "" },
						{ name: "friend_feedback", value: "" }
					],
					result: [],
					recall_date: new Date(0)
				}
			}
		}
	}
}