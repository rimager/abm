'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Manages authentication to any active providers.
 */
angular.module('abmApp')
  .controller('RegisterCtrl', function ($scope, simpleLogin, $location, fbutil, $timeout) {

    //load discipline data
    loadDisciplineData();

    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        simpleLogin.createAccount(email, pass, {rememberMe: true})
          .then(completeProfile, showError);
      }
    };

    function loadDisciplineData() {
      $scope.artgrouptypes = fbutil.syncArray('filters/artgrouptype');
      // display any errors
      $scope.artgrouptypes.$loaded().catch(showError);

    }


    //Gets a firebase ref to the user that was just created.
    function completeProfile(user) {

      var ref = fbutil.ref('users', user.uid);
      ref.update({artsGroup: $scope.artsGroup,
                   phone: $scope.phone}, afterUserUpdate);

    }

    function afterUserUpdate(err) {
      $timeout(function () {
        if (err) {
          showError(err);
        }
        else {
          $location.path('/account');
        }
      });
    }

    function showError(err) {
      $scope.err = err;
    }


  });
