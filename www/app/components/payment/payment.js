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

  PaymentCtrl.$inject = ['$state', '$scope', '$ionicLoading', 'payment'];
  function PaymentCtrl ($state, $scope, $ionicLoading, payment) {
    var vm = this;
    vm.$state = $state;
    vm.paymentData = payment.getPayment();

    vm.pay = function(){
      $ionicLoading.show({
        template : '<p><i class="icon assertive ion-checkmark"></i></p><p>The payment was successful.</p>' +
        '<button class="button button-small button-outline button-light" ng-click="payment.done()">OK</button>',
        scope: $scope
      });
    };

    vm.done = function() {
      $ionicLoading.hide();
      vm.$state.go('tabs.invoices');
    };
  }
}());
