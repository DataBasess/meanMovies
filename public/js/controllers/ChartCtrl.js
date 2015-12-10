angular.module('ChartCtrl', []).controller('ChartController', function($scope, Movie) {

	$scope.tagline = 'We all go a little MEAN sometimes';

	Movie.get().success(function (data) {

		data.sort(yearSort)
		$scope.movies = data

		var stats = []
		$scope.labels = []
		
		var movieCount = []

		for (var i = 0; i < data.length; i++) {
			var movie = data[i]
			upsertArray(movie.year, movieCount)			
		}

		var arrData = []
		for (var i = 0; i < movieCount.length; i++) {
			$scope.labels.push(movieCount[i].key)
			arrData.push(movieCount[i].count)
		}

		$scope.data = [arrData];

		$scope.series = ['Films Per Year']

	});
});