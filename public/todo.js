var todo = angular.module('todo', []);

todo.controller('todoController', function($scope){
    $scope.saved = localStorage.getItem('tasks');
    $scope.tasks = $scope.saved !== null ? JSON.parse($scope.saved) : [];
    localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    console.log(localStorage.getItem('tasks'));
    
    $scope.completeCount = function() { 
        let count = 0; 
        $scope.tasks.forEach(function(t) {
            if (t.completed === true) count++;
        });
        return count; 
    }();
    $scope.showCompleted = false; 

    $scope.add = function() {
        let t = {
            name: $scope.taskName,
            completed: false
        };
        $scope.tasks.push(t);
        $scope.taskName = ""; 
        localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    }
    $scope.toggleComplete = function(t) {
        if (t.completed) 
            $scope.completeCount++;
        else 
            $scope.completeCount--;
        localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    }
    $scope.destroy = function(t) {
        let index = $scope.tasks.indexOf(t); 
        $scope.tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify($scope.tasks));
    }

    $scope.toggleFilter = function() {
        $scope.showCompleted = !$scope.showCompleted; 
    }
});

todo.filter('completedFilter', function() {
    return function(tasks, show) {
        console.log(tasks);
        if (!show) {
            var result = [];
            tasks.forEach(function(t) {
                if (t.completed === false) result.push(t);  
            });
            return result; 
        } else { 
            return tasks;
        }
    }
});