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
      userPin = pin;
      return $q.when(userPin);
    }

    function getUserPin(){
      return userPin;
    }

    function logOut(){
      userPin = null;
    }
  }
}());
