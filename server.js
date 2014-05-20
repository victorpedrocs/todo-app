// Server.js
    //set up ========================
    var express = require('express');
    var app = express(); // create the app with express
    var mongoose = require('mongoose'); // mongoose for mongodb

    // configuration ========================
    mongoose.connect('mongodb://todo-app:todo-app@ds049198.mongolab.com:49198/heroku_app25394501'); 	// connect to mongoDB database on modulus.io

    app.configure(function() {
            app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
            app.use(express.logger('dev')); 						// log every request to the console
            app.use(express.bodyParser()); 							// pull information from html in POST
        });

    // Todo Model =================================
    var Todo = mongoose.model('Todo', {
        text : String
    });

    // routes =======================
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            if(err)
                res.send(err);
            res.json(todos);
        });
    });

    app.post('/api/todos', function(req, res) {
        Todo.create({
            text : req.body.text,
            done : false,
        },
        function(err, todo) {
            if(err)
                res.send(err);
            
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });
    });

    app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        },
        function(err, todo) {
            if (err)
                res.send(err);
            
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err);
                
                res.json(todos);
            });
        });
    });

    // Routing frontend
    app.get('*', function(req, res){
        res.sendfile('./public/index.html');
    });

    // listen (start app with node server.js) ======================================
    app.listen(8888);
    console.log("App listening on port 8888");
