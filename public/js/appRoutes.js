angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'partials/home',
			controller: 'MainController'
		})

		.when('/basic', {
			templateUrl: 'partials/basic',
			controller: 'MainController'
		})

		.when('/movies', {
			templateUrl: 'partials/movie',
			controller: 'MovieController'
		})

		.when('/geeks', {
			templateUrl: 'partials/geek',
			controller: 'GeekController'	
		});

	$locationProvider.html5Mode(true);

}]);