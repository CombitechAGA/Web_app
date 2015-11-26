var app = angular.module('app', ['dx', 'ui.router', 'ngResource'])

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
	.state('message', {
		url: '/message',
		templateUrl: 'message.html',
		controller: 'messageController'
	})
	.state('newzbee', {
		url: '/new_zbee',
		templateUrl: 'newZbee.html',
		controller: 'newZbeeController'
	})
	.state('mission', {
		url: '/mission',
		templateUrl: 'mission.html',
		controller: 'missionController'
	})
 	.state('simulate', {
	    url: '/simulate',
	    templateUrl: 'simulate.html',
	    controller: 'simulateController'
	})
 	.state('newsimjob', {
 	    url: '/simulate/newsimjob',
 	    templateUrl: 'newsimjob.html',
 	    controller: 'newsimjobController'
 	})

})

.run(['$state', function ($state) {
	$state.transitionTo('dashboard');
}])

