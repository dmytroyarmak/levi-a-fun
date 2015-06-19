(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.tabs', [])
    .config(tabsConfig);

  tabsConfig.$inject = ['$stateProvider'];
  function tabsConfig ($stateProvider) {
    $stateProvider.state('tabs', {
      abstract: true,
      url: '/tab',
      templateUrl: 'app/components/login/login.html'
    });
  }
}());
