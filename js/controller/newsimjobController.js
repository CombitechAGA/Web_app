app.controller('newsimjobController', ['$scope', '$state', 'NewSimJobService', function ($scope, $state, newSimJobService) {
    var newsimjob = newSimJobService.showAllRoutes();
        $scope.selectedItems = [];
        $scope.CarID = "CarID (replace original CarID)";
        $scope.RepeatJob = "Repeat simulation job? (true/false)";
        $scope.SpeedMultiplier = "Speed Muptipler Factor X";
        $scope.JobStarted = "Job is Started? (true/false)"

        newSimJobService.showAllRoutes()
                   .then(function (data) {
                       $scope.entries = data;                      
                   });
                  
        $scope.gridOptions = {
            bindingOptions: {
                dataSource: 'entries'
            },
            paging: {
                enabled: false
            },
            editing: {
                editMode: 'row',
                editEnabled: false,
                removeEnabled: true,
                insertEnabled: false,
                removeConfirmMessage: 'Are you sure you want to delete this?'
            },
            selection: {
                mode: 'multiple'
            },
            selectionChanged: function (items) {
                //$scope.selectedItems = [];
                $scope.selectedItems = items.selectedRowsData;

            },
            columns: [
                {
                    dataField: 'RouteId',
                    caption: 'Route Id'
                },
                {
                    dataField: 'carID',
                    caption: 'Car Id'
                },
                {
                    dataField: 'timestamp',
                    caption: 'Timestamp Last Point'
                },
            ]

        },
  

        $scope.createJob = function () {
            if ($scope.carID === "Job Simulation id must be entered or the creation will fail!") {
                console.log("Ange jobid!")
                confirm("Enter a valid Simulation Jobid!");
            }
            else
            {
                console.log("Save New SimJob.")
                
                var simObject = { "carId": $scope.CarID, "repeatJob": $scope.RepeatJob, "speedX": $scope.SpeedMultiplier, "jobStarted": $scope.JobStarted, "Routes": $scope.selectedItems };
               
                //if ($scope.selectedItems.count() > 0)
                newSimJobService.saveSimJob(simObject)
                .then(function () {
                });

                //$state.go('simjobs');
               // $state.go('createJob');
           }
        }

    }]);