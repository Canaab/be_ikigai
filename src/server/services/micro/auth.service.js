const jwt = require('jsonwebtoken');
const { MoleculerError } = require('moleculer').Errors;

const private_key = '4e6a353121d4896af4e1a8e925836400e7a09fd9bd9748bfe70536e16bec3b5e'

module.exports = {
	name: 'auth',

	actions: {
		sign: {
			handler(ctx) {
				return jwt.sign(ctx.params, private_key, {expiresIn: '1d'});
			}
		},

		verify: {
			params: {
				token: 'string'
			},

			handler(ctx) {
				return jwt.verify(ctx.params.token, private_key, this.verify_async);
			}
		}
	},

	methods: {
		verify_async(err, decoded) {
			if(err)
				throw new MoleculerError(err.message, 403, err.name, null);
			else
				return decoded;
		}
	}
};