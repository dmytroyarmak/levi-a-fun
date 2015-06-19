angular.module('levi-a-fun.controllers', [])

.controller('LoginCtrl', function($scope, $state) {
  $scope.onLoginFormSubmit = function() {
    $state.go('tab.accounts');
  };
})

.controller('AccountsCtrl', function() {})

.controller('AboutCtrl', function() {});
