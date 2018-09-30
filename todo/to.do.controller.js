(function () {
    'use strict';

    angular
        .module('app')
        .controller('TodoCtrl', TodoCtrl);

        TodoCtrl.$inject = ['TodoService', 'FlashService'];
        function TodoCtrl(TodoService, FlashService) {

            var vm = this;

            vm.editMode = false;

            vm.todos = [];

            vm.addNew = addNew
            vm.deleteTodo = deleteTodo

            initController();   

            function initController() {
                    LoadAllTodos();
            }

            function LoadAllTodos() {
                TodoService.GetAllTodos()
                .then(function (todos) {
                    vm.todos = todos;
                });
            }

            function addNew() {
                TodoService.AddNewTodo(vm.todo)
                    .then(function (response) {
                        if (response.success) {
                            FlashService.Success('To-Do Added', true);
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

      /*      function TriggerEditMode () {
                this.editMode = !this.editMode;
            } */

        }
})();