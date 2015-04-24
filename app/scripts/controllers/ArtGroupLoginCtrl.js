'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:ArtGroupLoginCtrl
 * @description
 * # ArtGroupLoginCtrl
 * Manages authentication to any active providers.
 */
angular.module(window.appName)
  .controller('ArtGroupLoginCtrl', function ($scope, simpleLogin, $state, flashSvc) {


    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      simpleLogin.passwordLogin({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    function redirect() {
      $state.go('artGroup.account');
    }

    function showError(err) {
      flashSvc.error(err);
    }


  });
