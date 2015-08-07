app.controller('configurationController', ['$scope', 'MqttService', function($scope, mqttService){ 

	$scope.subscribe = "New subscribe topic.";
	$scope.unSubscribe = "Unsubscribe to topic.";
	$scope.ip = "New ip-address.";
	$scope.connectionPort = "New port.";
	$scope.interval = "New snapshot-interval.";
	$scope.deviceName = "New device name.";
	$scope.carID = "Car id must be entered or the update will fail!";
	$scope.configObjects = [];


	 if(typeof mqttService.client === 'undefined'){
   			mqttService.standardConnect();
 	}


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

	$scope.submitCarID = function(){
		mqttService.requestConfigOnDB(function(message){
			var configBuild = message.split("\n");
			var values = [];
			console.log("här är mina values");
			for (var i = 0; i < configBuild.length-1; i++) {
				values.push(configBuild[i].split("#")[1]);
				console.log(values);
				//$scope.configObjects.push({"Key":configBuild[i].split("#")[0],"Value":configBuild[i].split("#")[1]});
			}
			$scope.ip = values[0];
			$scope.connectionPort = values[1];
			$scope.interval = values[2];
			$scope.$apply();
		}, $scope.carID);
		console.log("Nu kicka du på device id");
	};	
}]);
 