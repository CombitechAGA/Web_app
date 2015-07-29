app.controller('configurationController', ['$scope', 'MqttService', function($scope, mqttService){ 

	$scope.subscribe = "New subscribe topic";
	$scope.unSubscribe = "Unsubscribe to topic";
	$scope.ip = "New ip-address";
	$scope.connectionPort = "New port";
	$scope.interval = "New snapshot-interval";
	$scope.deviceName = "New device name";


	$scope.subscribeToTopic = function(){
		console.log("Nu kicka du på Subscribe");
		mqttService.test("id:"+ "bil id" + ";subscribe:"+$scope.subscribe);

	};

	$scope.unSubscribeToTopic = function(){
		console.log("Nu kicka du på unSubscribe");
		mqttService.test("id:"+ "bil id" + ";unsubscribe:"+$scope.unSubscribe);
	};

	$scope.updateIP = function(){
		console.log("Nu kicka du på ip");
		mqttService.test("id:"+ "bil id" + ";ip:"+$scope.ip);

	};

	$scope.updatePort = function(){
		console.log("Nu kicka du på port");
		mqttService.test("id:"+ "bil id" + ";port:"+$scope.connectionPort);

	};

	$scope.updateName = function(){
		console.log("Nu kicka du på name");
		mqttService.test("id:"+ "bil id" + ";devicename:"+$scope.deviceName);

	};
	$scope.updateInterval = function(){
		console.log("Nu kicka du på interval");
		mqttService.test("id:"+ "bil id" + ";interval:"+$scope.interval);

	};



}]);
