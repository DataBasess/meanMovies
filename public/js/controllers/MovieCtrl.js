

angular.module('MovieCtrl', []).controller('MovieController', function($scope, Movie) {

	$scope.tagline = "That's no moon. It's a space station";

	Movie.get().success(function (data) {
		data.sort(yearSort)
		$scope.movies = data
	});

	$scope.createMovie = function (isValid) {
		if (!isValid) return;
		// if (!$scope.newMovieTitle || !$scope.newMovieYear || !$scope.newMovieDirector) return;
		// console.log('creating movie', $scope.newMovieTitle, $scope.newMovieYear, $scope.newMovieDirector)

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
				data.sort(yearSort)
				$scope.movies = movies
			});
		});
	}

	$scope.checkTitle = function(data) {
    	// return "something";
	}
	$scope.checkYear = function(data) {
    	// return "yyyy"
	}
	$scope.checkDirector = function(data) {
    	// return "err"
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