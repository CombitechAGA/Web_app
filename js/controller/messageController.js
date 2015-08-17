app.controller('messageController', ['$scope', 'MqttService', function($scope, mqttService){ 

	$scope.carID = "Car id must be entered or the message can not be sent!";
	$scope.messageToSend = "Enter a message you would like to send to the registered Zbee."

	 if(typeof mqttService.client === 'undefined'){
   			mqttService.standardConnect();
 	}

	$scope.message = function(){
		if ($scope.carID === "Car id must be entered or the message can not be sent!")
			confirm("Enter a valid car id!");
		else 
			mqttService.setDeviceID($scope.carID);
			mqttService.send("message;messageText:" + $scope.messageToSend);
	};	
}]);
 