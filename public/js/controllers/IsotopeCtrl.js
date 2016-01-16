angular.module('IsotopeCtrl', []).controller('IsotopeController', function($scope, $http, Movie) {

	$scope.tagline = "Take your stinking paws off me, you damned dirty ape!";	

	$scope.isoInit = function() {
		$scope.movies = grabMovies();
	}

	function grabMovies() {
		// console.log('grabbing movies')
		Movie.get().success(function (movies) {
			// movies.sort(yearSort)
			$scope.movieCount = movies.length + ' movies'
			$scope.movies = movies
		});
	}
});