(function() {
  'use strict';

  angular
    .module('levi-a-fun.services.accounts', [])
    .factory('accounts', accounts);

  accounts.$inject = ['$http', 'BACKEND_ADDRESS'];
  function accounts($http, BACKEND_ADDRESS){
    var userPin = null;

    return {
      getUserAccounts : getUserAccounts,
      getUserAccount: getUserAccount
    };

    function getUserAccounts(pin){
      return $http
        .get(BACKEND_ADDRESS + '/api/user/' + pin + '/accounts')
        .then(getDataFromResponce);
    }

    function getUserAccount(accountId) {
      return $http
        .get(BACKEND_ADDRESS + '/api/accounts/' + accountId)
        .then(getDataFromResponce);
    }

    function getDataFromResponce(resp) {
      return resp.data;
    }
  }
}());
