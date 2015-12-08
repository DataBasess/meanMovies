

angular.module('MovieCtrl', []).controller('MovieController', function($scope, Movie) {

	$scope.tagline = 'Hello from MovieController!!';

	Movie.get().success(function (data) {
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

	$scope.checkTitle = function(data) {
    	if (data.length == 0) {
			return "UTitle is required";
		}
	}

	$scope.saveMovie = function(data, id) {
    	// console.log('saving...', data, id)
    	angular.extend(data, {_id: id});

    	Movie.update(data).success(function (movie) {
    		Movie.get().success(function (movies) {
				$scope.movies = movies
			});
    	});
	 }

});