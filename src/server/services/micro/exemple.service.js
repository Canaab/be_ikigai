module.exports = {
	name: "service",

	actions : {
		action: {
			params: {
				val: "number"
			},

			handler(ctx) {
				return "Value : " + (ctx.params.val | 0);
			}
		}
	}
};