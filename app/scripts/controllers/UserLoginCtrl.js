'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:UserLoginCtrl
 * @description
 * # UserLoginCtrl
 * Manages authentication to any active providers.
 */
angular.module(window.appName)
  .controller('UserLoginCtrl', function ($scope,
                                             abmConfig,
                                             simpleLogin) {


    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      simpleLogin.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        redirect, $scope.showError
      );
    };

    function redirect() {
      return;
    }




  });
