app.controller('newZbeeController', ['$scope', 'MqttService', function($scope, mqttService){ 

	$scope.subscribe = "New subscribe topic.";
	$scope.unSubscribe = "Unsubscribe to topic.";
	$scope.ip = "New ip-address.";
	$scope.connectionPort = "New port.";
	$scope.interval = "New snapshot-interval.";
	$scope.deviceName = "New device name.";
	$scope.carID = "Car id must be entered or the update will fail!";
	$scope.userName = "User name for the mqtt server";
	$scope.password = "Passord for the mqtt server";
	$scope.configObjects = [];
	$scope.homePosision = "New home posision";
	$scope.zoomLvl = "Zoom level for the map";
	$scope.margin = "Margin for point of now return in kilometers";
	$scope.geoFenceRadius = "Geofence radius from home posision in meters";
	$scope.mode = "CORS mode, enter true or false";
	$scope.qos = "Quality of service, (0,1,2)";

	if(typeof mqttService.client === 'undefined'){
		mqttService.standardConnect();
	}

	$scope.createZbee = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!"){
			console.log("ändra fältet!!")
			confirm("Enter a valid car id!");
		}
		else{
			console.log("nu körs createConfigOnDB")
			mqttService.setDeviceID($scope.carID);
			mqttService.create("id:"+ $scope.carID+ ";broker:" + $scope.ip + ";port:"+$scope.connectionPort+";interval:"+$scope.interval+ ";User:"+$scope.userName+";password:"+$scope.password+";qos:"+$scope.qos+";home:"+$scope.homePosision+";zoom:"+$scope.zoomLvl+";margin:"+$scope.margin+";geofence:"+$scope.geoFenceRadius+";simulator:"+$scope.mode);
		} 

	};	
}]);
