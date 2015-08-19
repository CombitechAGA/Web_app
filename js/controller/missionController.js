app.controller('missionController', ['$scope', 'MqttService', function($scope, mqttService){ 

	$scope.carID = "Vehicle id must be entered or the mission can not be sent!";
	$scope.location = "Mission location.";
	$scope.messageToSend = "Enter message.";

	 if(typeof mqttService.client === 'undefined'){
   			mqttService.standardConnect();
 	}

	$scope.message = function(){
		if ($scope.carID === "Vehicle id must be entered or the mission can not be sent!")
			confirm("Enter a valid Vehicle id!");
		else 
			mqttService.setDeviceID($scope.carID);
			mqttService.send("mission;"+ "location:" + $scope.location + ";messageText:" + $scope.messageToSend);
	};	
}]);
 