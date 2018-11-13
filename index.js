const { ServiceBroker } = require('moleculer');

const broker = new ServiceBroker({
	namespace: "dev",
	nodeID: "node-1",
	hotReload: true
});

broker.loadServices('./src/server/api');
broker.loadServices('./src/server/implementation');
broker.loadServices('./src/server/services');

broker.start().then(() => broker.repl());