var app = angular.module('app', ['dx', 'ui.router'])

.config(function ($stateProvider) {
	$stateProvider
	.state('dashboard', {
		url: "",
		templateUrl: "dashboard.html",
		controller: 'MainController'

	})
	.state('statistics', {
		url: "/statistics",
		templateUrl: "statistics.html",
		controller: 'statisticsController'
		
	})
	.state('routes', {
		url: '/routes',
		templateUrl: 'routes.html',
		controller: 'statisticsController'
	})
	.state('configuration', {
		url: '/configuration',
		templateUrl: 'configuration.html',
		controller: 'configurationController'
	})

})

.run(['$state', function ($state) {
	$state.transitionTo('dashboard');
}])

