

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
				movies.sort(yearSort)
				$scope.movies = movies
			});
		});
	}

	$scope.delMovie = function (id) {
		// console.log('deleting from controller', id)
		Movie.delete(id).success(function (data) {
			Movie.get().success(function (movies) {
				movies.sort(yearSort)
				$scope.movies = movies
			});
		});
	}

	$scope.showDelConf = function() {
		$scope.isDeleting = true;
	}
	$scope.hideDelConf = function() {
		$scope.isDeleting = false;
	}

	$scope.checkTitle = function(data) {
		if (!data) return "Title is required"
    	// return "something";
	}
	$scope.checkYear = function(data) {
		if (!data) return "Year is required"
    	// return "yyyy"
	}
	$scope.checkDirector = function(data) {
		if (!data) return "Director is required"
    	// return "err"
	}

	$scope.saveMovie = function(data, id) {
    	
    	angular.extend(data, {_id: id});
		// console.log(data)
    	Movie.update(data).success(function (result) {
    		// console.log(result)
    		Movie.get().success(function (movies) {
    			movies.sort(yearSort)
				$scope.movies = movies
			});
    	});
	 }

});