const has = require('lodash/has');

module.exports = {
	actions: {
		"#edge/receive": {
			params: {},

			handler(ctx) {
				const { object, entry } = ctx.params;

				if(object === 'page' && has(entry[0], 'messaging')) {
					const {sender, message} = entry[0].messaging[0];

					const params = {
						m_id: sender.id,
						message: message.text,
						intent: message.quick_reply ? message.quick_reply.payload : '',
						nlp: message.nlp.entities
					};

					this.logger.info("PARAMS RECEIVED :", params);
					// We don't want this call to be returned, because it ends with a HTTP request.
					ctx.call("@chatbot.#tasks/handle", params);
				} else {
					this.logger.info("Unable to handle event. Ignored.");
				}
				// Returning a simple string as a 200OK answer.
				return "EVENT_RECEIVED";
			}
		}
	}
}