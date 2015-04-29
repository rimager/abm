'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:ArtGroupRegisterCtrl
 * @description
 * # ArtGroupRegisterCtrl
 * Manages authentication to any active providers.
 */
angular.module(window.appName)
  .controller('ArtGroupRegisterCtrl', function ($scope, simpleLogin, fbutil,
                                        abmConfig,
                                        $state, $firebaseArray, $timeout,
                                        accountSvc,
                                        companySvc, flashSvc, preferenceSvc) {

    var filterRef = fbutil.ref(abmConfig.api.filters.artgrouptypes);

    //create a var to hold the company preferences
    $scope.preferences  = {};


    //load preferences data data
    $scope.artgrouptypes = $firebaseArray(filterRef);

    //If there was an error when loading the discipline data show it.
    // display any errors
    $scope.artgrouptypes.$loaded().catch(showError);


    //Handles the account creation
    $scope.createAccount = function(email, pass) {

      //Validations are good so create account
      simpleLogin.createAccount(email, pass, {rememberMe: true})
          .then(completeProfile, showError);

    };


    function completeProfile(company) {

      //add account to our manage list of accounts
      accountSvc.addAccount(company.uid,
        {type: abmConfig.profile.type.company});

      //adding profile data
      companySvc.updateProfile(company.uid,
        {artsGroup: $scope.artsGroup, phone: $scope.phone,
        preferences: $scope.preferences}, flashSvc.error);

      //adding users to every preference
      updateCompanyPreferences(company);

    }

    function updateCompanyPreferences(company) {
      preferenceSvc.addCompanyToPreferences(company.uid, $scope.preferences);

      //preferenceSvc.addUserToCompanies(userData.user.uid, $scope.preferences);
      $state.go(abmConfig.states.company.home);
    }

    //for each company that also share this preference
    // update the user on the companies user collection
    // update the company in the user company collection.
    function showError(err) {
      flashSvc.error(err);
    }


  });
