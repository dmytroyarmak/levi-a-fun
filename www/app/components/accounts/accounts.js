(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.accounts', [])
    .config(accountsConfig)
    .controller('AccountsCtrl', AccountsCtrl);

  accountsConfig.$inject = ['$stateProvider'];
  function accountsConfig ($stateProvider) {
    $stateProvider.state('tabs.accounts', {
      url: '/accounts',
      views: {
        'accounts-tab': {
          templateUrl: 'app/components/accounts/accounts.html',
          controller: 'AccountsCtrl as accounts'
        }
      }
    });
  }

  AccountsCtrl.$inject = [];
  function AccountsCtrl () {
  }
}());
