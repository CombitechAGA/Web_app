app.factory('MqttService', function(){

var connectMqtt = function () {
		// Create a client instance
	client = new Paho.MQTT.Client("81.236.122.138", 8000, "clientId");

	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	// connect the client
	client.connect({onSuccess:onConnect});
};

// called when the client connects
function onConnect() {
// Once a connection has been made, make a subscription and send a message.
console.log("onConnect");
client.subscribe("telemetry/snapshot");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
if (responseObject.errorCode !== 0) {
console.log("onConnectionLost:"+responseObject.errorMessage);
}
}

var messageCallback = function(message){
};
// called when a message arrives
function onMessageArrived(message) {

	var messageParameters = [];
	messageParameters = message.payloadString.split(";");
	console.log(messageParameters);
	var valueList = [];
	var values = {};

	for (var param in messageParameters) {
			console.log(param);
			var temp = messageParameters[param].split(":");
			valueList.push(temp[1]);
			console.log(temp[1]);
	}

	values.carID = valueList[0];
	values.timestamp = valueList[1];
	values.fuel = valueList[2];
	values.speed = valueList[3];
	values.distanceTraveled = valueList[4];
	values.longitude = valueList[5];
	values.latitude = valueList[6]; 

	console.log("onMessageArrived:"+message.payloadString);
	messageCallback(values)
}

return {

	connect: function (callback) {
		messageCallback = callback;
		connectMqtt();
	}
};
});