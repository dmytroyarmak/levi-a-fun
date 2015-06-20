(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.accounts', [
      'levi-a-fun.services.session',
      'levi-a-fun.services.accounts'
    ])
    .config(accountsConfig)
    .controller('AccountsCtrl', AccountsCtrl);

  accountsConfig.$inject = ['$stateProvider'];
  function accountsConfig($stateProvider) {
    $stateProvider.state('tabs.accounts', {
      url: '/accounts',
      views: {
        'accounts-tab': {
          templateUrl: 'app/components/accounts/accounts.html',
          controller: 'AccountsCtrl as accounts',
          resolve: {
            accountsList: function($q, session, accounts) {
              if (session.isLoggedIn()) {
                return accounts.getUserAccounts(session.getUserPin());
              } else {
                return $q.reject('Not authrorized');
              }
            }
          }
        }
      }
    });
  }

  AccountsCtrl.$inject = ['$state', 'accountsList'];
  function AccountsCtrl($state, accountsList) {
    this.$state = $state;
    this.accountsList = accountsList;
  }

  AccountsCtrl.prototype.goToAccountDetails = function(account) {
    this.$state.go('tabs.account', {id: account.id});
  };
}());
