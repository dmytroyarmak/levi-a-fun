(function() {
  'use strict';

  angular
    .module('levi-a-fun.components.payment', [])
    .config(paymentConfig)
    .controller('PaymentCtrl', PaymentCtrl);

  paymentConfig.$inject = ['$stateProvider'];
  function paymentConfig ($stateProvider) {
    $stateProvider.state('tabs.payment', {
      url: '/payment',
      views: {
        'invoices-tab' : {
          templateUrl: 'app/components/payment/payment.html',
          controller: 'PaymentCtrl as payment',
          resolve: {
            accountDetails: function($q, $stateParams, session) {
              if (session.isLoggedIn()) {
                return true;
              } else {
                return $q.reject('Not authrorized');
              }
            }
          }
        }
      }
    });
  }

  PaymentCtrl.$inject = ['$state', 'payment'];
  function PaymentCtrl ($state, payment) {
    var vm = this;
    vm.$state = $state;
    vm.paymentData = payment.getPayment();

    vm.pay = function(){
      vm.$state.go('tabs.invoices');
    }
  }
}());
