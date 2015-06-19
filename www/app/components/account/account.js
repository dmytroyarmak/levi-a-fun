(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.account', [])
    .config(accountConfig)
    .controller('AccountCtrl', AccountCtrl);

  accountConfig.$inject = ['$stateProvider'];
  function accountConfig ($stateProvider) {
    $stateProvider.state('tabs.account', {
      url: '/accounts/:id',
      views: {
        'accounts-tab' : {
          templateUrl: 'app/components/account/account.html',
          controller: 'AccountCtrl as account',
          resolve: {
            accountDetails: function($q, $stateParams, session, accounts) {
              if (session.isLoggedIn()) {
                return accounts.getUserAccount($stateParams.id);
              } else {
                return $q.reject('Not authrorized');
              }
            }
          }
        }
      }
    });
  }

  AccountCtrl.$inject = ['accountDetails'];
  function AccountCtrl (accountDetails) {
    var vm = this;

    vm.accountDetails = accountDetails;

    vm.createInvoice = function(){
      console.log('aaaa', this.transferAmount);
    }
  }
}());
