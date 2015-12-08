var Movie = require('./models/Movie')

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls


	app.get('/api/movies', function (req, res) {
        //use mongoose to get all nerds from the database
        Movie.find(function(err, movies){
            if(err){
                res.send(err);
            }else{
                res.json(movies);
            }
        });
    });

    app.post('/api/movies', function (req, res) {
    	var newMovie = new Movie(req.body)
    	newMovie.save(function (err, newMovie) {

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
	                newMovie: newMovie
	            });
	            res.end();
	        }
		});
    });

    app.put('/api/movies/:id', function (req, res) {
    	var movie = new Movie(req.body)
    	// console.log(movie)
    	movie.update(function (err, movie) {
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
	                movie: movie
	            });
	            res.end();
	        }    		
    	})
    });

    app.delete('/api/movies/:id', function(req, res) {
    	// console.log('deleting from routes', req.params)
        Movie.remove({_id: req.params.id }, function(err, movie) {
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
	                message: 'Movie successfully deleted'
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