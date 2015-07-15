<<<<<<< HEAD

var app = angular.module('app', ['dx', 'ui.router'])

.config(function ($stateProvider) {
	$stateProvider
	.state('dashboard', {
      url: "/home",
      templateUrl: "dashboard.html",
      controller: 'MainController'

    })

})

.run(['$state', function ($state) {
   $state.transitionTo('dashboard');
}])
=======
var app = angular.module('app', ['dx']);
>>>>>>> d5b11b6e32c33622f5ef48d2db587c1820ccbe35
