app.controller('configurationController', ['$scope', 'MqttService', function($scope, mqttService){ 

	$scope.subscribe = "New subscribe topic.";
	$scope.unSubscribe = "Unsubscribe to topic.";
	$scope.ip = "New ip-address.";
	$scope.connectionPort = "New port.";
	$scope.interval = "New snapshot-interval.";
	$scope.deviceName = "New device name.";
	$scope.carID = "Car id must be entered or the update will fail!";

	$scope.subscribeToTopic = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.test("id:"+ $scope.carID + ";subscribe:"+$scope.subscribe);
	};

	$scope.unSubscribeToTopic = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.test("id:"+ $scope.carID + ";unsubscribe:"+$scope.unSubscribe);
	};

	$scope.updateIP = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.test("id:"+ $scope.carID + ";ip:"+$scope.ip);
	};

	$scope.updatePort = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.test("id:"+ $scope.carID + ";port:"+$scope.connectionPort);
	};

	$scope.updateName = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.test("id:"+ $scope.carID + ";devicename:"+$scope.deviceName);
	};
	$scope.updateInterval = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.test("id:"+ $scope.carID+ ";interval:"+$scope.interval);
	};

	$scope.submitCarID = function(){
		console.log("Nu kicka du på device id");
	};	
}]);
