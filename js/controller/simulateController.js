    app.controller('simulateController', ['$scope', '$state','SimJobService', function ($scope, $state, simJobService) {
        var simjobs = simJobService.showAllSimJobs();

        simJobService.showAllSimJobs()
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
                editEnabled: true,
                removeEnabled: true,
                insertEnabled: true,
                allowEditing: true,
                saveAllChanges: 'Save Simulation Job',
                removeConfirmMessage: 'Are you sure you want to delete this simulation job?'
            },
            selection: {
                mode: 'multiple'
            },

            onRowUpdated: function (item) {
                console.log("Save updated simjob.")
               
                var simObject = { "simJobId": item.key.SimJobId, "carId": item.key.carId, "repeatJob": item.key.repeatJob, "speedX": item.key.speedX, "jobStarted": item.key.jobStarted, "Routes": item.key.Routes };
                // gör get, för att få alla rutter och snapshots som försvunnit i gridden till strängar

                simJobService.saveSimJob(simObject)
                .then(function () {
                });
            },
            onRowRemoving: function (item) {
                console.log("Delete simjob.")
               
                var simObject = { "simJobId": item.key.SimJobId, "carId": item.key.carId, "repeatJob": item.key.repeatJob, "speedX": item.key.speedX, "jobStarted": item.key.jobStarted, "Routes": item.key.Routes };
                
                simJobService.removeSimJob(simObject)
                .then(function () {
                });
            },
            columns: [
                {
                    dataField: 'SimJobId',
                    caption: 'Job Id'
                },
                {
                    dataField: 'carId',
                    caption: 'Car Id'
                },
                {
                    dataField: 'repeatJob',
                    caption: 'Repeat Job'
                },
                {
                    dataField: 'speedX',
                    caption: 'Speed Multipler'
                },
                {
                    dataField: 'jobStarted',
                    caption: 'Job Started'
                },
                {
                    dataField: 'nrOfRoutes',
                    caption: 'Routes',
                },
                /*
                {
                    dataField: 'Routes',
                    caption: 'Routes',
                    dataType: 'object',
                },*/
/*                {
                    dataField: 'Registered',
                    dataType: 'date',
                    width: 90
                }*/
            ]
        }

        $scope.newSimJob = function () {
            if ($scope.SimJobId === "Job Simulation id must be entered or the creation will fail!") {
                console.log("Ange jobid!")
                confirm("Enter a valid Simulation Jobid!");
            }
            else
            {
                console.log("Open Page New Sim Job.")
 
                $state.go('newsimjob');
            }
        }

    }]);