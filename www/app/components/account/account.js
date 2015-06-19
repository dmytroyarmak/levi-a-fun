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

  AccountCtrl.$inject = ['$ionicLoading', '$scope', 'accountDetails'];
  function AccountCtrl ($ionicLoading, $scope, accountDetails) {
    var vm = this;

    vm.accountDetails = accountDetails;
    vm.createInvoice = createInvoice;
    vm.cancelInvoice = cancelInvoice;

    function createInvoice(){
      if(window.nfc || (window.cordova && window.cordova.nfc)) {
        $ionicLoading.show({
          template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner>' +
            '<p>Tap another device to transfer...</p>' +
            '<button class="button button-outline button-light" ng-click="account.cancelInvoice()">Cancel</button>',
          scope: $scope
        });

        nfc.share(
          _generateInvoiceNdefMessage(),
          function onShareSuccess() {
            $ionicLoading.hide();
          },
          function onShareError(error) {
            console.error("Error adding NDEF listener " + JSON.stringify(error));
          }
        );
      } else {
        console.log('no nfc bro :(');
      }
    }

    function cancelInvoice() {
      $ionicLoading.hide();
    };

    function _generateInvoiceNdefMessage (argument) {
      var invoiceData = JSON.stringify({
        account: vm.accountDetails,
        amount: vm.transferAmount
      });

      return [
          ndef.textRecord(invoiceData)
      ];
    }
  }
}());
