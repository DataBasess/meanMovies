angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService', 'ui.bootstrap'])
.controller('HeaderController', function($scope, $location) {
  $scope.isActive = function (viewLocation) {
    return $location.path().indexOf(viewLocation) >= 0;
  };

  $scope.isCollapsed = true;

  // $scope.isCollapsed = true;
 //  function NavBarCtrl($scope) {
 //  	console.log('collapsing')
 //    $scope.isCollapsed = true;
	// }

 //  $scope.toggleCollapse = function() {
 //  	console.log('clicked')
 //  	$('.navbar-collapse').click(function() {
	//   $('.navbar-collapse').collapse('hide');
	// });
 //  }
})

