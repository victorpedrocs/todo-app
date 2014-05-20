var Todo = require('./model/todo');

module.exports = function(app) {
	// API ----------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res){
		// use mongoose to get all todos from DB
		Todo.find(function(err, todos){
			//if there is any error, this will send it
			if( err ){
				res.send(err);
			}
			res.json(todos); // return all todos in json format
		});
	});

	// create a todo and send all back after creation
	app.post('/api/todos', function(req, res){
		// create the todo from json on request
		Todo.create(
		{
			text : req.body.text,
			done : false
		},
		function(err, todos){
			if( err )
				res.send(err);

			Todo.find(function(err, todos){
				if( err )
					res.send(err);
				res.json(todos);
			});
		});
	});

	//delete a todo
	
}