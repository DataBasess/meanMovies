angular.module('MovieCtrl', []).controller('MovieController', function($scope, $http, Movie) {

	$scope.tagline = "That's no moon. It's a space station";

	Movie.get().success(function (movies) {
		movies.sort(yearSort)
		$scope.movieCount = movies.length + ' movies'
		$scope.movies = movies
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
				$scope.movieCount = movies.length + ' movies'
				$scope.movies = movies
			});
		});
	}

	$scope.delMovie = function (id) {
		// console.log('deleting from controller', id)
		Movie.delete(id).success(function (data) {
			Movie.get().success(function (movies) {
				movies.sort(yearSort)
				$scope.movieCount = movies.length + ' movies'
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
		// console.log('checking title')
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
    		Movie.get().success(function (movies) {
    			movies.sort(yearSort)
    			$scope.movieCount = movies.length + ' movies'
				$scope.movies = movies
			});
    	});
	 }

	$scope.onSelect = function($item, $model, $label) {
		// console.log($item)
		var selected = $item.split(' | ');
		$scope.newMovieTitle = selected[0];
		$scope.newMovieYear = +selected[1];

		getDirector(selected[0]);
	}

	$scope.selected = undefined;
	
	// Any function returning a promise object can be used to load values asynchronously
	$scope.getMovies = function(val) {
		$scope.queryUrl = 'http://www.omdbapi.com/?type=movie&r=json&s=' + encodeURIComponent(val) + '*'
		return $http.get('//www.omdbapi.com/', {
		  params: {
		  	type: 'movie',
		  	r: 'json',
		    s: val + '*'
		  }
		}).then(function(response){
			console.log(response)
			if (response.data.Error) {
				if (response.data.Error.indexOf("Timeout expired") > -1) return
				return [response.data.Error]
			}
			return response.data.Search.map(function(item) {
				return item.Title + ' | ' + item.Year;
			})
		});
	};
	function getDirector (val) {
		$scope.queryUrl = 'http://www.omdbapi.com/?r=json&t=' + encodeURIComponent(val)
		return $http.get('//www.omdbapi.com/?r=json', {
		  params: {
		  	r: 'json',
		    t: val
		  }
		}).then(function(response){
			// console.log(response.data.Director)
			if (response.data.Error) return response.data.Error
			return $scope.newMovieDirector = response.data.Director


		});
	};
});