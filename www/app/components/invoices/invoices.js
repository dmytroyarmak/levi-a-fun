(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.invoices', [
      'levi-a-fun.services.session',
      'levi-a-fun.services.accounts',
      'levi-a-fun.services.payment'
    ])
    .config(invoicesConfig)
    .controller('InvoicesCtrl', InvoicesCtrl);

  invoicesConfig.$inject = ['$stateProvider'];
  function invoicesConfig ($stateProvider) {
    $stateProvider.state('tabs.invoices', {
      url: '/invoices',
      views: {
        'invoices-tab': {
          templateUrl: 'app/components/invoices/invoices.html',
          controller: 'InvoicesCtrl as invoices',
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

  InvoicesCtrl.$inject = ['$ionicLoading', '$scope','$state', 'accountsList', 'payment'];
  function InvoicesCtrl ($ionicLoading, $scope, $state, accountsList, payment) {
    var vm = this;
    vm.$state = $state;
    // variables models
    vm.invoice = null;
    vm.accountsList = accountsList;
    // action handlers
    vm.emulateInvoice = emulateInvoice;
    vm.lookUpMT = lookUpMT;
    vm.shareMessage = shareMessage;
    vm.goToPayFromAccount = goToPayFromAccount;
    vm.cancelLookup = cancelLookup;

    ////

    function goToPayFromAccount(account) {
      payment.formPayment(account, vm.invoice.account, vm.invoice.amount)
      .then(function(){
        vm.$state.go('tabs.payment');
      });
    }   

    function emulateInvoice(){
      vm.invoice = {
        account : {
          "id": "5583d161bab8647e0a3ea0a2",
          "name": "Nikki",
          "iban": "5583D1610D0B0B7317CA6B11",
          "country": "NL",
          "amount": 1072.49
        },
        amount : 199
      };
    }

    function shareMessage(){
      if(window.nfc || (window.cordova && window.cordova.nfc)) {
        var message = [
            ndef.textRecord('{"test" : true }')
        ];

        nfc.share(
          message,
          function () { // success callback
              alert("message shared");
          },
          function (error) { // error callback
              alert("Error adding NDEF listener " + JSON.stringify(error));
          }
        );
      } else {
        console.log('no nfc bro :(');
      }
    }

    function cancelLookup() {
      $ionicLoading.hide();
    }

    function lookUpMT(){
      // Read NDEF formatted NFC Tags
      if(window.nfc || (window.cordova && window.cordova.nfc)) {
        $ionicLoading.show({
          template: '<ion-spinner icon="lines" class="spinner-assertive"></ion-spinner>' +
            '<p>Looking for NFC-invoices</p>' +
            '<button class="button button-outline button-light" ng-click="invoices.cancelLookup()">Cancel</button>',
          scope: $scope
        });

        nfc.addMimeTypeListener(
          'text/plain',
          function (nfcEvent) {
              var tag = nfcEvent.tag,
                  ndefMessage = tag.ndefMessage;

              $ionicLoading.hide();

              // assuming the first record in the message has 
              // a payload that can be converted to a string.
              //alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
              vm.invoice = JSON.parse(nfc.bytesToString(ndefMessage[0].payload).substring(3));
              $scope.$apply();
          }, 
          function () { // success callback
              //alert("Waiting for NDEF tag");
          },
          function (error) { // error callback
              alert("Error adding NDEF listener " + JSON.stringify(error));
          }
        );
      } else {
        console.log('no nfc bro :(');
      }
    }
  }
}());
