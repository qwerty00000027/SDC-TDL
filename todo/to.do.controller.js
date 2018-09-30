(function () {
    'use strict';

    angular
        .module('app')
        .controller('TodoCtrl', TodoCtrl);

        TodoCtrl.$inject = ['TodoService', 'FlashService', 'UserService', '$rootScope'];
        function TodoCtrl(TodoService, FlashService, UserService, $rootScope) {

            var vm = this;

            vm.editMode = false;
            vm.todos = [];
            vm.user = null;
            vm.allUsers = [];

            vm.addNew = addNew
            vm.deleteTodo = deleteTodo  
            vm.LoadAllTodos = LoadAllTodos
            
            initController();

            function initController() {
                    LoadAllTodos();
                    loadCurrentUser();
            }

            function loadCurrentUser() {
                UserService.GetByUsername($rootScope.globals.currentUser.username)
                    .then(function (user) {
                        vm.user = user;
                    });
            }

            function LoadAllTodos() {
                TodoService.GetAllTodos()
                .then(function (todos) {
                    vm.todos = todos;
                });
            }

            function addNew() {
                vm.todo.id = vm.user.id;
                TodoService.AddNewTodo(vm.todo)
                    .then(function (response) {
                        if (response.success) {
                            FlashService.Success('To-Do Added', true);
                            vm.todo = {};
                            vm.form.$setPristine();
                            initController();
                        } else {
                            FlashService.Error('To-Do could not be added');
                        }
                    });
            }

            function deleteTodo(index) {
                TodoService.DeleteTodo(index)
                    .then(function (response) {
                        if (response.success) {
                            FlashService.Success('To-Do Deleted', true);
                            initController();
                        } else {
                            FlashService.Error('To-Do could not be deleted');
                        }
                    });
            }

        }
})();