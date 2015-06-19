(function() {
  'use strict';

  angular
    .module('levi-a-fun', [
      'ionic',
      'levi-a-fun.components.login',
      'levi-a-fun.components.tabs',
      'levi-a-fun.components.accounts',
      'levi-a-fun.components.about',
    ])
    .config(leviAFunConfig)
    .run(leviAFunRun);

  leviAFunConfig.$inject = ['$urlRouterProvider'];
  function leviAFunConfig ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
  }

  leviAFunRun.$inject = ['$ionicPlatform'];
  function leviAFunRun ($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  }
}());
