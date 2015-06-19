(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.login', [])
    .config(loginConfig)
    .controller('LoginCtrl', LoginCtrl);

  loginConfig.$inject = ['$stateProvider'];
  function loginConfig ($stateProvider) {
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'app/components/login/login.html',
      controller: 'LoginCtrl as login'
    });
  }

  LoginCtrl.$inject = ['$state'];
  function LoginCtrl ($state) {
    this.$state = $state;
  }

  LoginCtrl.prototype.onLoginFormSubmit = function() {
    this.$state.go('tabs.accounts');
  };
}());
