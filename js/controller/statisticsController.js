//app.controller('statisticsController', ['$scope', function($scope){
app.controller('statisticsController', ['$scope', 'DataBaseService', function($scope, dataBaseService){
//dataBaseService.getRoutes($scope.carId, $scope.startDate, $scope.endDate)
     //.then(function(data) {
       //  $scope.routesList = data;
    //}
    //här borde det användas promise smidigt sätt att använda http GET från databasen kanske? asynchron 
   // );

var employees = dataBaseService.getEmployees();
$scope.lookUpOptions = {
    bindingOptions: {
        dataSource: 'employees'
    },
    searchEnabled: true
};


$scope.dataSource = [{
    country: "Centrum",
    area: 12
}, {
    country: "Kirseberga",
    area: 7
}, {
    country: "Fosie",
    area: 7
}, {
    country: "Oxie",
    area: 7
}, {
    country: "Limhamn",
    area: 6
}, {
    country: "Hyllie",
    area: 5
}, {
    country: "Rosengård",
    area: 2
}, {
    country: "Malmö innerstad",
    area: 55
}];

$scope.location = "Vehicle position";

$scope.updateLocation = function () {
    console.log($scope.location);
    $scope.mapComponent.addMarker({
        location: $scope.location
    });
};



var dxChartData = [{
     name: "Ny",
     mass: 5,
     type: 'Star'
 }, {
     name: "1",
     mass: 4.7,
     type: 'Planet'
 }, {
     name: "2",
     mass: 4,
     type: 'Planet'
 }, {
     name: "3",
     mass: 3.6,
     type: 'Planet'
 }, {
     name: "4 ",
     mass: 3,
     type: 'Planet'
 }, {
     name: "5 ",
     mass: 3,
     type: 'Planet'
 }, {
     name: "6 ",
     mass: 3,
     type: "Planet"
 }, {
     name: "7 ",
     mass: 2,
     type: 'Planet'
 }, {
     name: "8 ",
     mass: 1.9,
     type: 'Planet'
 }, {
     name: "9 ",
     mass: 1.8,
     type: 'Satellite'
 }, {
     name: "10",
     mass: 1,
     type: 'Satellite'
 }];



$scope.chartOptions= {
    dataSource: dxChartData,
    commonPaneSettings: {
        border: {
            visible: true
        }
    },
    commonAxisSettings: {
        grid: {
            visible: true
        }
    },
    series: {
        type: 'scatter',
        valueField: "mass",
        argumentField: "name",
        tagField: 'type',
        point: {
            size: 20
        }
    },
    customizePoint: function () {
        var color;
        var hoverStyle;
        switch (this.tag) {
            case 'Star':
                color = 'red';
                hoverStyle = { border: { color: 'red' } };
                break;
            case 'Satellite':
                color = 'gray';
                hoverStyle = { border: { color: 'gray' } };
        }
        return { color: color, hoverStyle: hoverStyle }
    },
    valueAxis: {
        type: 'linar',
        title: 'Avstånd i mil'
    },
    title: "Avverkat avstånd på 100% laddat batteri",
    legend: {
        visible: false
    },
    tooltip: {
        enabled: true
    }
}
$scope.pieChartOptions= {
    size:{ 
        width: 500
    },
   bindingOptions:{
    dataSource: 'dataSource',
    
   }, 
    series: [
        {
            argumentField: "country",
            valueField: "area",
            label:{
                visible: true,
                connector:{
                    visible:true,           
                    width: 1
                }
            }
        }
    ],
    title: "Andel Zbees i olika stadsdelar",
    onPointClick: function(e) {
        var point = e.target;
        point.isVisible() ? point.hide() : point.show();
    }
};

$scope.mapOptions = {
        height: 900,
        width: "100%",
        autoAdjust: false,
        center: "skåne",
        zoom: 5,
        controls: true,
        onContentReady: function(e) {
            $scope.mapComponent = e.component;
        }
    };
 
}]);