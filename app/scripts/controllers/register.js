'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Manages authentication to any active providers.
 */
angular.module('abmApp')
  .controller('RegisterCtrl', function ($scope, simpleLogin,
                                        $location, fbutil, $timeout,
                                        userSvc, flashSvc, preferenceUserSvc) {

    //create a var to hold the disciplines / preferences from the user
    $scope.preferences  = {};


    //load discipline data
    $scope.artgrouptypes = fbutil.syncArray('filters/artgrouptype');

    //If there was an error when loading the discipline data show it.
    // display any errors
    $scope.artgrouptypes.$loaded().catch(showError);


    //Handles the account creation
    $scope.createAccount = function(email, pass, confirm) {

      //Validations are good so create account
      simpleLogin.createAccount(email, pass, {rememberMe: true})
          .then(completeProfile, showError);

    };


    function completeProfile(user) {

      //adding profile data
      userSvc.updateProfile(user.uid,
        {artsGroup: $scope.artsGroup, phone: $scope.phone,
        preferences: $scope.preferences}, flashSvc.error);

      //adding users to every preference
      updateUserPreferences(user);

    }

    function updateUserPreferences(user) {
      preferenceUserSvc.addUserToPreferences(user.uid, $scope.preferences);
      //preferenceCompanySvc.addUserToCompanies(userData.user.uid, $scope.preferences);
      $location.path('/account');
    }

    //for each company that also share this preference
    // update the user on the companies user collection
    // update the company in the user company collection.
    function showError(err) {
      flashSvc.error(err);
    }


  });
