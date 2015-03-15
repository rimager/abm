'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Manages authentication to any active providers.
 */
angular.module('abmApp')
  .controller('RegisterCtrl', function ($scope, simpleLogin, $location, fbutil, $timeout, userSvc, preferenceUserSvc) {

    //create a var to hold the disciplines / preferences from the user
    $scope.preferences  = {};


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


    function completeProfile(user) {
      userSvc.updateProfile(user.uid, {artsGroup: $scope.artsGroup,
                                   phone: $scope.phone,

        preferences: $scope.preferences})
        .then(updateUserPreferences, showError);
    }

    function updateUserPreferences(userData) {
      preferenceUserSvc.addUserToPreferences(userData.user.uid, $scope.preferences);
      preferenceCompanySvc.addUserToCompanies(userData.user.uid, $scope.preferences);
      $location.path('/account');
    }

    //for each company that also share this preference
    // update the user on the companies user collection
    // update the company in the user company collection.


    function showError(err) {
      $scope.err = err;
    }


  });
