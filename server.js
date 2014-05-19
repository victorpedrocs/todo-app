// Server.js
    //set up ========================
    var express = require('express');
    var app = express(); // create the app with express
    var mongoose = require('mongoose'); // mongoose for mongodb

    // configuration ========================
    mongoose.connect('mongodb://vpcsilva:vpedro123@ds049198.mongolab.com:49198/heroku_app25394501'); 	// connect to mongoDB database on modulus.io

    app.configure(function() {
            app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
            app.use(express.logger('dev')); 						// log every request to the console
            app.use(express.bodyParser()); 							// pull information from html in POST
        });

    // listen (start app with node server.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");
