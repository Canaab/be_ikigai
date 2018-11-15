const { ServiceBroker } = require('moleculer');

const broker = new ServiceBroker({
	namespace: "dev",
	nodeID: "node-1",
	hotReload: true
});

broker.loadServices('./services/api');
broker.loadServices('./services/implementation');
broker.loadServices('./services/micro');

broker.start().then(() => broker.repl());