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
                                        abmConfig, profileHelperSvc,
                                        $state, $firebaseArray, $timeout,
                                        profileSvc,
                                        companySvc, flashSvc, preferenceSvc, safeApply) {

   // var filterRef = fbutil.ref(abmConfig.api.filters.artgrouptypes);

    //create a var to hold the company preferences
        //get time availability and minimun donations
        preferenceSvc.getFilters( function(filters) {
            safeApply(function() {
                $scope.filters = filters;

            })});


    $scope.account = {company: true};


    //Handles the account creation
    $scope.register= function(email, pass) {

      //Validations are good so create account
      simpleLogin.createAccount(email, pass, true,  {rememberMe: true})
          .then(completeProfile, showError);

    };


    function completeProfile(company) {


      //add account to our manage list of accounts
      profileSvc.addProfile(company.uid,profileHelperSvc.sanitizeArtGroupProfile($scope.account), 'companies', flashSvc.error);

      //adding users to every preference
      updateCompanyPreferences(company);

      $state.go(abmConfig.states.company.home);
    }

    function updateCompanyPreferences(company) {
     //sanitize preflist
     var preference_list = profileHelperSvc.sanitizePreferenceList($scope.account.match_preferences);
      preferenceSvc.addCompanyToPreferences(company.uid, preference_list);

    }

    function showError(err) {
      flashSvc.error(err);
    }


  });
