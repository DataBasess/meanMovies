

angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	Nerd.get().success(function (data) {
		$scope.tagline += ' Got more nerds'
		$scope.nerds = data
	});

	$scope.createMovie = function () {
		if (!$scope.newMovieTitle || !$scope.newMovieYear || !$scope.newMovieDirector) return;
		// console.log('saving', $scope.newMovieTitle, $scope.newMovieYear, $scope.newMovieDirector)

		var newMovie = {
			title: $scope.newMovieTitle,
			year: +$scope.newMovieYear,
			director: $scope.newMovieDirector
		}

		Nerd.create(newMovie).success(function (data) {
			// console.log('successful save', data)
			$scope.newMovieTitle = $scope.newMovieYear = $scope.newMovieDirector =''
			Nerd.get().success(function (nerds) {
				$scope.nerds = nerds
			});
		});
	}

	$scope.delMovie = function (id) {
		// console.log('deleting from controller', id)
		Nerd.delete(id).success(function (data) {
			Nerd.get().success(function (nerds) {
				$scope.nerds = nerds
			});
		});
	}

});