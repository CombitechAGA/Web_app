
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
