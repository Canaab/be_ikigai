const services = [
	'mongo',
	'chatbot',
	'ikigai',
	'user',
	'auth',
	'application'
];

module.exports = {
	loadServices(broker) {
		broker.createService(require("./services/api"));
		services.forEach(service => broker.createService(require("./services/" + service)))
	}
}