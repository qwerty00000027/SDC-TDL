(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'UserService', 'FlashService'];
    function LoginController($location, AuthenticationService, UserService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    UserService.GetByUsername(vm.username)
                    .then(function (user) {
                        vm.id = user.id;
                        AuthenticationService.SetCredentials(vm.username, vm.password, vm.id);
                        $location.path('/');
                    });
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

})();
