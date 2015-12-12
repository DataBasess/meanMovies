angular.module('ChartCtrl', []).controller('ChartController', function($scope, Movie) {

	$scope.tagline = 'We all go a little MEAN sometimes';

	Movie.get().success(function (data) {

		data.sort(yearSort)
		// $scope.movies = data

		var min = data[0].year;
		var max = data[data.length-1].year;

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

		for (var i = 0; i < data.length; i++) {
			var movie = data[i]
			upsertArray(movie.year, movieCount)
		}
		// console.log(movieCount)
		var chartData = []
		for (var i = 0; i < movieCount.length; i++) {
			// labels.push(movieCount[i].key)
			chartData.push(movieCount[i].count)
		}

		$scope.labels = labels
		$scope.data = [chartData];

		$scope.series = ['Films Per Year']

	});
});