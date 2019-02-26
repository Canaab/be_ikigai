const request = require('axios');

module.exports = {
	actions: {
		"#tasks/get-health": {
			handler(ctx) {
				return request({
					method: 'GET',
					url: 'http://localhost:5000/health'
				}).catch(e => {
						this.logger.error(e);
						return { data: { status: 'offline' }};
					})
			}
		}
	}
}