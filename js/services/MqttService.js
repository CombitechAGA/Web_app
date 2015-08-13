app.factory('MqttService', function(){

var createConfigOnDB = function(argument){

	console.log("nu är jag i functionen med argument: " + argument);
	client.subscribe(globalDeviceID + "/failedToCreateNewDevice");
	message = new Paho.MQTT.Message(argument);
	message.destinationName = "new/config";
	client.send(message);
}

var	updateConfig = function(argument){
	client.subscribe(globalDeviceID+"/failedToUpdate")
	message = new Paho.MQTT.Message(argument);
  	message.destinationName = "set/config";
  	client.send(message);
};
var globalDeviceID;

var requestConfig = function(deviceID){
	globalDeviceID = deviceID;
	client.subscribe(deviceID + "/config");
	message = new Paho.MQTT.Message(deviceID);
	message.destinationName = "request/config";
	client.send(message);
};

var sendMessage = function(text){
	message = new Paho.MQTT.Message(text);
	message.destinationName = globalDeviceID+"/message";
	client.send(message);
};

var connectMqtt = function () {
		// Create a client instance
	client = new Paho.MQTT.Client("mqtt.phelicks.net", 9001, "clientId");

	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	// connect the client
	client.connect({userName:"cab", password:"sjuttongubbar", onSuccess:onConnect});
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
	console.log("detta är destinationName: "+message.destinationName);

	if (message.destinationName === globalDeviceID + "/config") {
		console.log("/config");
		console.log(message.payloadString);
		configCallback(message.payloadString);
	}
	else if (message.destinationName === globalDeviceID + "/failedToCreateNewDevice") {
		console.log("failedToCreateNewDevice")
		confirm(message.payloadString);

	}
	else if (message.destinationName === globalDeviceID+"/failedToUpdate") {
		confirm(message.payloadString);
	} else {
		console.log("/else");
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
		values.location = valueList[5] + ", " + valueList[4];

		console.log("första"+valueList[4]);
		console.log("andra"+valueList[5]);
		console.log("onMessageArrived:"+message.payloadString);
		messageCallback(values);
	}
	
};

return {

	setDeviceID: function(deviceID) {
		globalDeviceID = deviceID;
	},

	connect: function (callback) {
		messageCallback = callback;
		connectMqtt();
	},

	updateConfigOnDB: function(argument) {
		updateConfig(argument);
	},

	requestConfigOnDB: function(callback, argument) {
		requestConfig(argument);
		configCallback = callback;
	},
	standardConnect: function(){
		connectMqtt();
	}, 

	send: function(text){
		sendMessage(text);
	},
	create: function(text){
		createConfigOnDB(text);
	}
};
});