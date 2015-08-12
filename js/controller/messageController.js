app.controller('messageController', ['$scope', 'MqttService', function($scope, mqttService){ 

	$scope.carID = "Car id must be entered or the update will fail!";
	$scope.messageToSend = "Enter a message you would like to send to the registered Zbee."

	 if(typeof mqttService.client === 'undefined'){
   			mqttService.standardConnect();
 	}

	$scope.message = function(){
		if ($scope.carID === "Car id must be entered or the update will fail!")
			confirm("Enter a valid car id!");
		else 
			mqttService.setDeviceID($scope.carID);
			mqttService.send($scope.messageToSend);
	};	
}]);
 