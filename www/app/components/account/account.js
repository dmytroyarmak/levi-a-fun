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
          controller: 'AccountCtrl as account'
        }
      }
    });
  }

  AccountCtrl.$inject = [];
  function AccountCtrl () {
    var vm = this;

    vm.createInvoice = function(){
      console.log('aaaa');
    }
  }
}());
