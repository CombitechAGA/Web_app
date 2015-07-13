app.controller('MainController', ['$scope', 'MqttService', function($scope, mqttService){
	$scope.carMarkers = [];
	var selectedCarID = ""
	var addCarMarker = function (carID, location, timestamp, fuel, speed, distanceTraveled) {

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
		timestamp: (new Date(parseInt(timestamp))).toLocaleString(),
		fuel: fuel,
		speed: speed,
		distanceTraveled: distanceTraveled,
		tooltip: {
			text: "<strong> Car ID: "+carID+"</strong></br>" + "Timestamp: " + (new Date(parseInt(timestamp))).toLocaleString() + "</br>" + "Fuel: " + fuel + "</br>" + "Speed: " + speed + "</br>" + "Distance traveled: " + distanceTraveled + "</br>"
		}
	});

	for(var i=0;i<$scope.carMarkers.length; i++){
		if (selectedCarID === $scope.carMarkers[i].carid) {
			$scope.selectedCarIndex= i;
			$scope.carMarkers[i].iconSrc = "image/markedZbeeMarker2.png";
			console.log("index är: " + i);
		}	
	}


	$scope.$apply();
}

mqttService.connect(function(message){
	addCarMarker(message.carID, message.latitude + ", " + message.longitude, message.timestamp, message.fuel, message.speed, message.distanceTraveled);

});

$scope.mapOptions = {
	height: 800,
	width: "100%",
	autoAdjust: false,
	center: "Skane",
	zoom: 9,
	controls: true,
	markerIconSrc: "image/zbeeMarker2.png",
	bindingOptions: {
		markers: 'carMarkers'
	}
};

$scope.accordianOptions = {
	bindingOptions: {
		dataSource: 'carMarkers',
	},
	onContentReady: function(e){
		e.component.expandItem($scope.selectedCarIndex)
	},
	collapsible: true,
	multiple: false,
	itemTemplate : "carTemplate",
	onSelectionChanged : function(e){
		if(e.addedItems.length>0){
			selectedCarID = e.addedItems[0].carid;
		}
		else{
			for(var i=0;i<$scope.carMarkers.length; i++){
				if (selectedCarID === $scope.carMarkers[i].carid) {
					$scope.carMarkers[i].iconSrc = "image/zbeeMarker2.png";
					console.log("i else: " + i);
				}	
			}
			selectedCarID = "";
			$scope.$apply();
		}
		
		console.log("selectedCarID: " + selectedCarID);

	}

};
}]);