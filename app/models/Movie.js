// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Movie', {
	title : {type : String, default: ''},
	year : {type : Number },
	director : {type : String, default: ''}
}, 'movies');
