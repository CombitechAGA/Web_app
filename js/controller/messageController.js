app.controller('messageController', ['$scope', 'MqttService', function($scope, mqttService){ 

	$scope.carID = "Vehicle id must be entered or the message can not be sent!";
	$scope.messageToSend = "Enter a message you would like to send to the registered Vehicle."

	 if(typeof mqttService.client === 'undefined'){
   			mqttService.standardConnect();
 	}

	$scope.message = function(){
		if ($scope.carID === "Vehicle id must be entered or the message can not be sent!")
			confirm("Enter a valid Vehicle id!");
		else 
			mqttService.setDeviceID($scope.carID);
			mqttService.send("message;messageText:" + $scope.messageToSend);
	};	
}]);
 