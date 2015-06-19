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

    vm.lookUpMT = lookUpMT;

    vm.shareMessage = shareMessage;

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

    function lookUpMT(){
      // Read NDEF formatted NFC Tags
      if(window.nfc || (window.cordova && window.cordova.nfc)) {
        nfc.addMimeTypeListener(
          'text/plain',
          function (nfcEvent) {
              var tag = nfcEvent.tag,
                  ndefMessage = tag.ndefMessage;

              // assuming the first record in the message has 
              // a payload that can be converted to a string.
              alert(nfc.bytesToString(ndefMessage[0].payload).substring(3));
          }, 
          function () { // success callback
              alert("Waiting for NDEF tag");
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
