app.controller('MainController', ['$scope','$interval', 'MqttService', function($scope,$interval, mqttService){
	$scope.carMarkers = [];
	$scope.selectedCarID = ""
	$scope.selectedCarIndex =-1

	//Borde bara köras när vi har databas (och då aktiveras när man klickar någon "show live data" knapp och sen stängas av när man klickar ur den.)
	//$interval(function(){
		//ta bort gammal data
	//},10000)

	var updateMarker = function(car) {
		return {
			location: car.location,
			carID: car.carID,
			timestamp: car.timestamp,
			date: car.date,
			fuel: car.fuel,
			speed: car.speed,
			distanceTraveled: car.distanceTraveled,
			tooltip: {
				text: "<strong> Car ID: " 
				+ car.carID+"</strong></br>" 
				+ "Time: " + car.date + " " + car.timestamp + "</br>" 
				+ "Fuel: " + car.fuel + "</br>" 
				+ "Speed: " + car.speed + "</br>" 
				+ "Distance traveled: " + car.distanceTraveled + "</br>"
			}, 
			iconSrc: $scope.selectedCarID != car.carID ? "image/zbeeMarker2.png" : "image/markedZbeeMarker2.png"
		}
	};

	$scope.$watch('selectedCarID', function(newValue, oldValue) {
		for (var i = 0; i < $scope.carMarkers.length; i++) {
			if (newValue === $scope.carMarkers[i].carID) {
				$scope.selectedCarIndex= i;
				
				var tempCarMarker = updateMarker($scope.carMarkers[i]);
				$scope.mapComponent.removeMarker($scope.carMarkers[i]);
				$scope.carMarkers[i] = tempCarMarker;
				$scope.mapComponent.addMarker(tempCarMarker);

				console.log("index är: " + i);
			}

			if (oldValue === $scope.carMarkers[i].carID){
				var tempCarMarker = updateMarker($scope.carMarkers[i]);
				$scope.mapComponent.removeMarker($scope.carMarkers[i]);
				$scope.carMarkers[i] = tempCarMarker;
				$scope.mapComponent.addMarker(tempCarMarker);
			}	
		}

		if(!newValue){
			$scope.selectedCarIndex = -1;
		}

		//$scope.mapComponent.repaint();
		//$scope.accordionComponent.repaint();
	});

	mqttService.connect(function(car) {
		var carMarker = updateMarker(car);

		//om ID:et finnns, ta bort från arrayen
		var exists = false;
		for(var carIndex in $scope.carMarkers){
			if (car.carID === $scope.carMarkers[carIndex].carID) {
				exists = true;
				console.log("delete")
				$scope.mapComponent.removeMarker($scope.carMarkers[carIndex]);
				$scope.carMarkers[carIndex] = carMarker;
			}
		}

		if(!exists)
			$scope.carMarkers.push(carMarker);
		
		$scope.mapComponent.addMarker(carMarker);
		
		//$scope.accordionComponent.repaint();
	});

	$scope.mapOptions = {
		height: 900,
		width: "100%",
		autoAdjust: false,
		center: "skane",
		zoom: 5,
		controls: true,
		onContentReady: function(e) {
			$scope.mapComponent = e.component;
		}
	};

	$scope.accordianOptions = {
		bindingOptions: {
			dataSource: 'carMarkers',
		},
		onContentReady: function(e) {
			$scope.accordionComponent = e.component;
			if ($scope.selectedCarIndex >= 0)
				e.component.expandItem($scope.selectedCarIndex)
		},
		collapsible: true,
		multiple: false,
		itemTemplate : "carTemplate",
		onSelectionChanged : function(e) {
			if(e.addedItems.length > 0) {
				$scope.selectedCarID = e.addedItems[0].carID;
			} else {
				$scope.selectedCarID = "";
			}

			console.log("selectedCarID: " + $scope.selectedCarID);

		}

	};
}]);