(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.about', [])
    .config(aboutConfig)
    .controller('AboutCtrl', AboutCtrl);

  aboutConfig.$inject = ['$stateProvider'];
  function aboutConfig ($stateProvider) {
    $stateProvider.state('tabs.about', {
      url: '/tabs/about',
      templateUrl: 'app/components/about/about.html',
      controller: 'AboutCtrl',
      controllerAs: 'about'
    });
  }

  AboutCtrl.$inject = [];
  function AboutCtrl () {
  }
}());
