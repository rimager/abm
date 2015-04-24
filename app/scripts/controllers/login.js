'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module(window.appName)
  .controller('LoginCtrl', function ($scope, simpleLogin, $location) {
    $scope.oauthLogin = function(provider) {
      $scope.err = null;
      simpleLogin.login(provider, {rememberMe: true}).then(redirect, showError);
    };

    $scope.anonymousLogin = function() {
      $scope.err = null;
      simpleLogin.anonymousLogin({rememberMe: true}).then(redirect, showError);
    };

    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      simpleLogin.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };




    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  });
