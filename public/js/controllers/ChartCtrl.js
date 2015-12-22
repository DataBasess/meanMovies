angular.module('ChartCtrl', []).controller('ChartController', function($scope, Movie) {

	$scope.tagline = "That's no moon. It's a space station";

	Movie.get().success(function (movies) {
		if (!movies || movies.length==0) return
		buildYearChart(movies)
		buildRatingsChart(movies)
		buildWatchedChart(movies)
	});

	function buildWatchedChart(movies) {
		var labels = ['Not Watched', 'Watched']
		
		var movieCount = []
		for (var i = 0; i < movies.length; i++) {
			if (movies[i].watched) { 
				upsertArray('Watched', movieCount)
			} else {
				upsertArray('Not Watched', movieCount)
			}
		}

		movieCount.sort(keySort)

		// console.log(movieCount)

		var chartData = []
		for (var i = 0; i < movieCount.length; i++) {
			chartData.push(movieCount[i].count)
		}

		// console.log(chartData)

		$scope.watchedLabels = labels
		$scope.watchedData = chartData
	}

	function buildRatingsChart(movies) {

		var labels = ['Not Rated', 1, 2, 3, 4, 5]
		var movieCount = [{key:0, count:0},{key:1, count:0},{key:2, count:0},{key:3, count:0},{key:4, count:0},{key:5, count:0}]
		for (var i = 0; i < movies.length; i++) {
			upsertArray(movies[i].rating, movieCount)
		}

		var chartData = []
		for (var i = 0; i < movieCount.length; i++) {
			chartData.push(movieCount[i].count)
		}

		$scope.ratingsLabels = labels
		$scope.ratingsData = [chartData]
	}

	function buildYearChart(movies) {
		movies.sort(yearSort)
		var min = movies[0].year;
		var max = movies[movies.length-1].year;

		// console.log(min, max)
		var movieCount = []
		var labels = []
		while (min <= max) {
			labels.push(min); 
			movieCount.push({
				key: min,
				count: 0
			})
			min++;
		}
		// console.log(labels)
		// console.log(movieCount)

		for (var i = 0; i < movies.length; i++) {
			var movie = movies[i]
			upsertArray(movie.year, movieCount)
		}
		// console.log(movieCount)
		var chartData = []
		for (var i = 0; i < movieCount.length; i++) {
			// labels.push(movieCount[i].key)
			chartData.push(movieCount[i].count)
		}

		$scope.yearLabels = labels
		$scope.yearData = [chartData];

		$scope.yearSeries = ['Films Per Year']
	}
});