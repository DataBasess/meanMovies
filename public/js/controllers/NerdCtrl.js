angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	Nerd.get().success(function(data) {
		$scope.tagline += ' Got more nerds'
		$scope.nerds = data
	});

});