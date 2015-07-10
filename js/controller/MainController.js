app.controller('MainController', ['$scope', 'MqttService', function($scope, mqttService){
$scope.carMarkers = [];

var addCarMarker = function (carID, location, text) {

	//om ID:et finnns, ta bort från arrayen
	for(var car in $scope.carMarkers){
		
		if (carID === $scope.carMarkers[car].carid) {
			console.log("delete")
			$scope.carMarkers.splice(car,1);
		}
	}

	$scope.carMarkers.push({
			location: location,
			carid: carID,
			tooltip: {
				text: text
			}
		});
	$scope.$apply();
}

mqttService.connect(function(message){
		addCarMarker(message.carID, message.latitude + ", " + message.longitude,"<strong> Car ID: "+message.carID+"</strong></br>" + "Timestamp: " + (new Date(parseInt(message.timestamp))).toLocaleString() + "</br>" + "Fuel: " + message.fuel + "</br>" + "Speed: " + message.speed + "</br>" + "Distance traveled: " + message.distanceTraveled + "</br>");
		
	});

				//"<strong> Car ID: "+message.carID+"</strong></br>" + "Timestamp: " + message.timestamp + "</br>" + "Fuel: " + message.fuel + "</br>" + "Speed: " + message.Speed + "</br>" + "Distance traveled: " + message.distanceTraveled + "</br>"
/*mqttService.messageCallback = function(message){
		$scope.carMarkers.push({
			location: $scope.yourLocation,
			tooltip: {
				text: "<strong>"+message+"</strong></br>"
			}
		});
	};	
*/

	$scope.buttonClicked = function(){
		addCarMarker($scope.yourLocation,"<strong>"+"hej" +"</strong></br>");
		console.log($scope.carMarkers);
	};

$scope.mapOptions = {
	autoAdjust: false,
	height: 1080,
	width: 1500,
	center: "Skane",
	zoom: 9,
	controls: true,
	markerIconSrc: "/Users/thomasstrahl/Desktop/AngularWebApp/image/zbeeMarker2.png",
	bindingOptions: {
		markers: 'carMarkers'
	}
};
}]);