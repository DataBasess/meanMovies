angular.module('MovieService', []).factory('Movie', ['$http', function($http) {
	
	return {
	    // call to get all nerds
	    get : function() {
	        return $http.get('/api/movies');
	    },

	    // these will work when more API routes are defined on the Node side of things
	    // call to POST and create a new nerd
	    create : function(movieData) {
	        return $http.post('/api/movies', movieData);
	    },

	    // call to DELETE a nerd
	    delete : function(id) {
	        return $http.delete('/api/movies/' + id);
	    }
	} 
	

}]);