app.factory('NewSimJobService',function ($resource) {
    return {
        showAllRoutes: function () {
        
            return $resource("http://localhost:50780/api/simulator/routes")
                    .query() 
                    .$promise;
        },
        saveSimJob: function (SimJobId) {
        
        return $resource("http://localhost:50780/api/SimJob")
                 .save(SimJobId)
                .$promise;
    }
    }
});	