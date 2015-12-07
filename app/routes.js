var Nerd = require('./models/Nerd')

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls


	app.get('/api/nerds', function (req, res) {
        //use mongoose to get all nerds from the database
        Nerd.find(function(err, nerds){
            if(err){
                res.send(err);
            }else{
                res.json(nerds);
            }
        });
    });

	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};