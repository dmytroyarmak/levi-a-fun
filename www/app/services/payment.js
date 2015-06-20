(function() {
  'use strict';

  angular
    .module('levi-a-fun.services.payment', [])
    .factory('payment', payment);

  payment.$inject = ['$http', 'BACKEND_ADDRESS'];
  function payment($http, BACKEND_ADDRESS) {
    var paymentData = null;

    return {
      formPayment: formPayment,
      getPayment: getPayment
    };

    function getPayment() {
      return paymentData;
    }

    function formPayment(accFrom, accTo, amount) {

      var req = {
        method: 'POST',
        url: BACKEND_ADDRESS + '/api/transaction',
        headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: [
          "from=" + accFrom.id,
          "to=" + accTo.id,
          "amount=" + amount
        ].join('&')
      };

      return $http(req)
        .then(getDataFromResponce);
    }

    function getDataFromResponce(resp) {
      paymentData = resp.data;
      return resp.data;
    }
  }
}());
