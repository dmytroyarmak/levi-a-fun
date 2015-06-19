(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.about', [])
    .config(aboutConfig)
    .controller('AboutCtrl', AboutCtrl);

  aboutConfig.$inject = ['$stateProvider'];
  function aboutConfig ($stateProvider) {
    $stateProvider.state('tabs.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'app/components/about/about.html',
          controller: 'AboutCtrl as about'
        }
      }
    });
  }

  AboutCtrl.$inject = [];
  function AboutCtrl () {
  }
}());
