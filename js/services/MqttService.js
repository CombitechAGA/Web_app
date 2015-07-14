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
	var carID = messageParameters[0].split(":");
	var temp = "";
	for (var i = 1; i < carID.length; i++) {
		temp += carID[i] + ":";	
	}
	temp = temp.substring(0, temp.length-1);
	values.carID = temp;

	for (var i = 1; i < messageParameters.length; i++) {
		console.log(i + ": ");
		var temp = messageParameters[i].split(":");
		valueList.push(temp[1]);
		console.log(temp[1]);
	}
	var time = new Date(parseInt(valueList[0]));
	values.timestamp = time.toLocaleTimeString();
	values.date = time.toLocaleDateString();
	values.fuel = valueList[1];
	values.speed = valueList[2];
	values.distanceTraveled = valueList[3];
	values.location = valueList[4] + ", " + valueList[5];

	console.log(valueList[4]);

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