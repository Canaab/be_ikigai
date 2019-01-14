const { ServiceBroker } = require('moleculer');
const moment = require('moment');

moment.locale('fr');

const broker = new ServiceBroker({
	// Options
	metrics: true,
	logger: true,
	logFormatter: 'simple'
});

require("./services.js").loadServices(broker);

broker.start().then(() => {
	broker.repl();
	broker.call("@mongo.#edge/is-connected")
		.then(res => {
			if(res.isConnected) {
				broker.logger.info("Successfuly connected to database server.");
				broker.call("@mongo.#edge/init-db");
			}
			else {
				broker.logger.error("Unable to reach database server.");
				broker.stop();
			}
		})
});