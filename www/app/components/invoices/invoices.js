(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.invoices', [])
    .config(invoicesConfig)
    .controller('InvoicesCtrl', InvoicesCtrl);

  invoicesConfig.$inject = ['$stateProvider'];
  function invoicesConfig ($stateProvider) {
    $stateProvider.state('tabs.invoices', {
      url: '/invoices',
      views: {
        'invoices-tab': {
          templateUrl: 'app/components/invoices/invoices.html',
          controller: 'InvoicesCtrl as invoices'
        }
      }
    });
  }

  InvoicesCtrl.$inject = [];
  function InvoicesCtrl () {
    var vm = this;
    vm.invoiceData = {};
    vm.accounts = [];
    vm.lookUp = lookUp;

    function lookUp(){
      console.log('aaaaaa');
    }
  }
}());
