const { MoleculerError } = require('moleculer').Errors;

module.exports = {
	name: 'access',

	actions: {
		login: {
			handler(ctx) {
				return ctx.call('auth.sign', {foo: 'bar'})
					.then(token => ({
						code: 200,
						payload: token
					}))
					.catch(e => {
						throw new MoleculerError(e.toString(), 500, "CreateTokenError", null);
					})
			}
		},

		db: {
			handler(ctx) {
				return ctx.call('db.health')
					.then(res => {
						console.log(res)
						if(res.error)
							throw new MoleculerError(res.payload, 500, "DatabaseConnectionError", null);
						else
							return {
								code: 200,
								isConnected: res.payload
							}
					})
			}
		}
	},

}