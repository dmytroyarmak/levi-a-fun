(function() {
  'use strict';

  angular
    .module('levi-a-fun.services.session', [])
    .factory('session', session);

  session.$inject = ['$q'];
  function session($q){
    var userPin = null;

    return {
      login : login,
      getUserPin : getUserPin,
      logOut : logOut
    };

    function login(pin){
      var deferred = $q.defer();

      userPin = pin;
      deferred.resolve(pin);

      return deferred.promise;
    }

    function getUserPin(){
      return userPin;
    }

    function logOut(){
      userPin = null;
    }
  }
}());
