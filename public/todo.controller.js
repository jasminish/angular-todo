angular.module('todoApp')
    .controller('todoController', function($scope){
        $scope.tasks = []; 
        $scope.completeCount = 0; 
        $scope.showCompleted = false; 

        $scope.add = function() {
            var t = {
                name: $scope.taskName,
                completed: false
            };
            $scope.tasks.push(t);
            $scope.taskName = ""; 
        }
        $scope.toggleComplete = function(t) {
            if (t.completed) 
                $scope.completeCount++;
            else 
                $scope.completeCount--;
        }
        $scope.destroy = function(t) {
            let index = $scope.tasks.indexOf(t); 
            $scope.tasks.splice(index, 1);
        }

        $scope.toggleFilter = function() {
            $scope.showCompleted = !$scope.showCompleted; 
        }
    })
    .filter('completedFilter', function() {
        return function(tasks, show) {
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
    })