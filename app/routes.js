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

    app.post('/api/nerds', function (req, res) {
    	var newNerd = new Nerd(req.body)
    	newNerd.save(function (err, newNerd) {

			if (err) {
	            res.status(500);
	            res.json({
	                status: 500,
	                error: err
	            });
	            res.end();
	        }
	        else {
	            res.json({
	                status: 200,
	                newNerd: newNerd
	            });
	            res.end();
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