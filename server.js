// Server.js

    //set up ================================================
    var express     = require('express');
    var app         = express(); // create the app with express
    var mongoose    = require('mongoose'); // mongoose for mongodb
    var port        = 8888;
    var database    = require('./config/database');

    // configuration =========================================
    mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

    app.configure(function() {
        app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
        app.use(express.logger('dev')); 						// log every request to the console
        app.use(express.bodyParser()); 							// pull information from html in POST
        app.use(express.methodOverride()); 						// simulate DELETE and PUT
	});

    // routes ================================================
    require('./app/routes.js')(app);

    // listen ================================================
    // (start app with node server.js)

    app.listen(port);
    console.log("App listening on port: " + port);
