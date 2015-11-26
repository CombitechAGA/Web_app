app.factory('SimJobService',function ($resource) {
    return {
        showAllSimJobs: function () {
        
            //return $resource("http://localhost:50780/api/simjobs")
            return $resource("http://localhost:50780/api/SimJob")
                     .query()
                    .$promise;
        },
        getStartedSimJobs: function (simJobId) {

            return $resource("http://localhost:50780/api/SimJob")
                     .query(simJobId)
                    .$promise;
        },
        saveSimJob: function (SimJobId) {

            return $resource("http://localhost:50780/api/SimJob")
                     .save(SimJobId)
                    .$promise;
        },
        removeSimJob: function (SimJobId) {

            return $resource("http://localhost:50780/api/SimJob")
                     .delete(SimJobId)
                    .$promise;
        }
    }
});	