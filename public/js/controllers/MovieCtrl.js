

angular.module('MovieCtrl', []).controller('MovieController', function($scope, Movie) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	Movie.get().success(function (data) {
		$scope.tagline += ' Text from MovieController!'
		$scope.movies = data
	});

	$scope.createMovie = function () {
		if (!$scope.newMovieTitle || !$scope.newMovieYear || !$scope.newMovieDirector) return;
		// console.log('saving', $scope.newMovieTitle, $scope.newMovieYear, $scope.newMovieDirector)

		var newMovie = {
			title: $scope.newMovieTitle,
			year: +$scope.newMovieYear,
			director: $scope.newMovieDirector
		}

		Movie.create(newMovie).success(function (data) {
			// console.log('successful save', data)
			$scope.newMovieTitle = $scope.newMovieYear = $scope.newMovieDirector =''
			Movie.get().success(function (movies) {
				$scope.movies = movies
			});
		});
	}

	$scope.delMovie = function (id) {
		// console.log('deleting from controller', id)
		Movie.delete(id).success(function (data) {
			Movie.get().success(function (movies) {
				$scope.movies = movies
			});
		});
	}

});