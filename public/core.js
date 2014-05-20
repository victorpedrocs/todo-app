var todoApp = angular.module('todoApp', []);

function mainController($scope, $http) {
    $scope.formData = {};
    
    $http.get('/api/todos').success(function(data) {
        $scope.todos = data;
        console.log(data);
        
    })
    .error(function(data) {
        console.log('Error: ' + data);;
    });
    
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
        .success(function(data) {
            $scope.formData = {};
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    
    $scope.updateTodo = function(id, done) {
        $http.post('/api/todos/' + id + '/' + done)
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    
    $scope.archiveTodo = function(id, archived, done) {
        if (done){
            $http.post('/api/todos/' + id + '/archive/' + !archived)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });   
        }
    };
}