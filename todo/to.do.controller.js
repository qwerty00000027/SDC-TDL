(function () {
    'use strict';

    angular
        .module('app')
        .controller('TodoCtrl', TodoCtrl);

        TodoCtrl.$inject = ['TodoService'];
        function TodoCtrl(TodoService) {

            var vm = this;

            vm.editMode = false;

            vm.todos = [];

            vm.addNew = addNew

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
                            $location.path('#!/todo');
                        } else {
                            FlashService.Error('To-Do could not be added');
                        }
                    });
            }

      /*      function TriggerEditMode () {
                this.editMode = !this.editMode;
            } */

        }
})();