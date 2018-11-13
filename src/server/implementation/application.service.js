module.exports = {
	name: "application",

	actions: {
		health: {
			handler(ctx) {
				return ctx.call("$node.health");
			}
		}
	}
};