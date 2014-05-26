// Server.js

    //set up ================================================
    var express     = require('express');
    var mongoose    = require('mongoose'); 			// mongoose for mongodb
    var database    = require('./config/database');	// DB configuration

var ServerDeployer = function(){
	var self = this;
	
	self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };
	
	// setup variables
	self.setVariables = function(){
		self.serverPort  = process.env.PORT || 8080;
//		self.serverIpAdress = process.env.OPENSHIFT_NODEJS_IP || 127.0.0.1;
		self.app = express(); // create the app with express
	};
	
	// routes ================================================
	self.createRoutes = function(){
		require('./app/routes.js')(self.app);
	};
	// connect to mongoDB
	self.dbConnect = function(){
		mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io
	};
	
	// initialize the server
	self.initialize = function(){
		self.setVariables();
		self.setupTerminationHandlers();
		
		self.dbConnect();
		self.app.configure(function(){
			self.app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
			self.app.use(express.logger('dev')); 					// log every request to the console
			self.app.use(express.bodyParser()); 					// pull information from html in POST
			self.app.use(express.methodOverride());
		});
		
		self.createRoutes();
		
	};
	
	// Start application
	self.start = function(){
		self.app.listen(self.serverPort, function(){
			console.log(Date(Date.now()) + ' : App listening on port ' + self.serverPort);
		});
	};
	
};    

// Start application
var mainServer = new ServerDeployer();
mainServer.initialize();
mainServer.start();

