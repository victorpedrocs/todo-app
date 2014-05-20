var Todo = require('./model/todo');

// routes =======================
module.exports = function(app){
    // retrieve all todos
    app.get('/api/todos', function(req, res) {
        Todo.find(function(err, todos) {
            if(err)
                res.send(err);
            res.json(todos);
        });
    });

    // create a new todo and retrieve all todos
    app.post('/api/todos', function(req, res) {
        Todo.create({
            text    : req.body.text,
            done    : false,
            archived: false
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

    // delete a specific todo
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
	
}