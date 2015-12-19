// grab the mongoose module
var mongoose = require('mongoose');

// define our model
// module.exports allows us to pass this to other files when it is called

// routes has a protection layer, any changes here need to be reflected
module.exports = mongoose.model('Movie', {
	title : {type : String, default: ''},
	year : {type : Number },
	director : {type : String, default: ''},
	watched : {type : Boolean, default: false},
	rating : {type : Number, default: 0}
}, 'moviesbak');
