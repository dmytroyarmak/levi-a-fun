(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.login', [
      'levi-a-fun.services.session'
    ])
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

  LoginCtrl.$inject = ['$state', 'session'];
  function LoginCtrl ($state, session) {
    this.$state = $state;
    this.session = session;
    this.pin = '';
  }

  LoginCtrl.prototype.onLoginFormSubmit = function() {
    this.session.login(this.pin).then(function() {
      this.$state.go('tabs.accounts');
    }.bind(this));
  };
}());
