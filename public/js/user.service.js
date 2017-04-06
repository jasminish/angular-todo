angular.module('todoApp')
    .factory('UserService', UserService); 

UserService.$inject = ['$filter', '$q'];

function UserService($filter, $q) {

    var userService = {};

    userService.getAll = function() {
        var deferred = $q.defer();
        deferred.resolve(getUsers());
        return deferred.promise;
    };

    userService.getById = function(id) {
        var deferred = $q.defer();
        var filtered = $filter('filter')(getUsers(), { id: id });
        var user = filtered.length ? filtered[0] : null;
        deferred.resolve(user);
        return deferred.promise;
    };

    userService.getByUsername = function(username) {
        var deferred = $q.defer();
        var filtered = $filter('filter')(getUsers(), { username: username });
        var user = filtered.length ? filtered[0] : null;
        deferred.resolve(user);
        return deferred.promise;
    };

    userService.create = function(user) {
        var deferred = $q.defer();

        userService.getByUsername(user.username)
            .then(function (duplicateUser) {
                if (duplicateUser !== null) {
                    deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                } else {
                    var users = getUsers();

                    // assign id
                    var lastUser = users[users.length - 1] || { id: 0 };
                    user.id = lastUser.id + 1;

                    // save to local storage
                    users.push(user);
                    setUsers(users);

                    deferred.resolve({ success: true });
                }
            });

        return deferred.promise;
    };

    userService.update = function(user) {
        var deferred = $q.defer();

        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                users[i] = user;
                break;
            }
        }
        setUsers(users);
        deferred.resolve();

        return deferred.promise;
    }

    userService.delete = function(id) {
        var deferred = $q.defer();

        var users = getUsers();
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.id === id) {
                users.splice(i, 1);
                break;
            }
        }
        setUsers(users);
        deferred.resolve();

        return deferred.promise;
    }

    // private functions

    function getUsers() {
        if(!localStorage.users){
            localStorage.users = JSON.stringify([]);
        }

        return JSON.parse(localStorage.users);
    }

    function setUsers(users) {
        localStorage.users = JSON.stringify(users);
    }

    return userService; 
};