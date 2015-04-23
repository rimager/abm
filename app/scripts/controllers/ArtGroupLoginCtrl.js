'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:ArtGroupLoginCtrl
 * @description
 * # ArtGroupLoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('abmApp')
  .controller('ArtGroupLoginCtrl', function ($scope, simpleLogin, $state) {


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
