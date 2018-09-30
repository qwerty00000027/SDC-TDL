(function () {
    'use strict';

    angular
        .module('app')
        .factory('TodoService', TodoService);

        TodoService.$inject = ['$timeout', '$filter', '$q'];
        function TodoService($timeout, $filter, $q) {

            var service = {};
            
            service.AddNewTodo = AddNewTodo;
            service.DeleteTodo = DeleteTodo;
            service.GetAllTodos = GetAllTodos;
    
            return service;          

            function GetAllTodos() {
                var deferred = $q.defer();
                deferred.resolve(getToDos());
                return deferred.promise;
            }
            
            function AddNewTodo (todo) {
                var deferred = $q.defer();
                var todos = getToDos();
                todos.push(todo);
                setToDos(todos);
                deferred.resolve({ success: true });
                return deferred.promise;
            }
    
            function DeleteTodo (index) {
                var deferred = $q.defer();
                var todos = getToDos();
                todos.splice(index, 1);
                setToDos(todos);
                deferred.resolve({ success: true });
                return deferred.promise; 
            }

            function getToDos () {
                if(!localStorage.todos){
                    localStorage.todos = JSON.stringify([]);
                }
    
                return JSON.parse(localStorage.todos);
            }
    
            function setToDos (todos) {
                localStorage.todos = JSON.stringify(todos);
            }
        }
})();