angular.module('ChartService', []).factory('Chart', ['$http', function($http) {
	return {
	    // call to GET all movies
	    get : function() {
	        return $http.get('/api/movies');
	    }
	}
}]);