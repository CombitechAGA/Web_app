app.controller('configurationController', ['$scope', 'MqttService', function($scope, mqttService){ 

	$scope.subscribe = "New subscribe topic.";
	$scope.unSubscribe = "Unsubscribe to topic.";
	$scope.ip = "New ip-address.";
	$scope.connectionPort = "New port.";
	$scope.interval = "New snapshot-interval.";
	$scope.deviceName = "New device name.";
	$scope.carID = "Car id must be entered or the update will fail!";
	$scope.messageToSend = "Enter a message you would like to send to the registered Zbee."
	$scope.configObjects = [];
	$scope.homePosision = "New home posision"
	$scope.zoomLvl = "Zoom level for the map";
	$scope.margin = "Margin for point of now return in kilometers";
	$scope.geoFenceRadius = "Geofence radius from home posision in meters";
	$scope.mode = "CORS mode, enter true or false";

	 if(typeof mqttService.client === 'undefined'){
   			mqttService.standardConnect();
 	}

 		$scope.setMode = function(){
 		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";simulator:"+$scope.mode);
 	};

 	$scope.updateGeoFence = function(){
 		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";geofence:"+$scope.geoFenceRadius);
 	};

 	$scope.setMargin = function(){
 		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";margin:"+$scope.margin);
 	};

 	$scope.updateHome = function(){
 		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";home:"+$scope.homePosision);
 	};

 	$scope.updateZoom = function(){
 		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";zoom:"+$scope.zoomLvl);
 	};


	$scope.subscribeToTopic = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";subscribe:"+$scope.subscribe);
	};

	$scope.unSubscribeToTopic = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";unsubscribe:"+$scope.unSubscribe);
	};

	$scope.updateIP = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";ip:"+$scope.ip);
	};

	$scope.updatePort = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";port:"+$scope.connectionPort);
	};

	$scope.updateName = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID + ";devicename:"+$scope.deviceName);
	};
	$scope.updateInterval = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.updateConfigOnDB("id:"+ $scope.carID+ ";interval:"+$scope.interval);
	};

	$scope.message = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.send($scope.messageToSend);
	};

	$scope.submitCarID = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!") {
			confirm("Enter a valid car id!");
		} else {
			mqttService.requestConfigOnDB(function(message){
				var configBuild = message.split("\n");
				var values = [];
				for (var i = 0; i < configBuild.length-1; i++) {
					values.push(configBuild[i].split("#")[1]);
					console.log(values);
					//$scope.configObjects.push({"Key":configBuild[i].split("#")[0],"Value":configBuild[i].split("#")[1]});
				}
				$scope.ip = values[0];
				$scope.connectionPort = values[1];
				$scope.interval = values[2];
				$scope.homePosision = values[6]
				$scope.zoomLvl = values[7]
				$scope.margin = values[8]
				$scope.$apply();
			}, $scope.carID);
		}
	};	
}]);
 