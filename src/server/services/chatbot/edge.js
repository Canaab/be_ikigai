const has = require('lodash/has');

module.exports = {
	actions: {
		"#edge/receive": {
			params: {},

			handler(ctx) {
				const { data } = ctx.params.originalDetectIntentRequest.payload;
				const { queryText, intent, outputContexts, parameters, fulfillmentMessages } = ctx.params.queryResult;

				const params = {
					fb_id: data.sender ?data.sender.id: null,
					message: queryText,
					receptionDate: data.timestamp,
					intent: intent.displayName,
					q_params: parameters,
					contexts: outputContexts ? outputContexts.map(context => context.name.split('/').pop()) : [],
				};

				this.logger.info("From @chatbot.#edge/receive -", params);

				return ctx.call("@chatbot.#tasks/handle", params)
			}
		}
	}
}