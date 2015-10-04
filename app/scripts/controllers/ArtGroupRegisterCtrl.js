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
                                        companySvc, flashSvc, preferenceSvc) {

   // var filterRef = fbutil.ref(abmConfig.api.filters.artgrouptypes);

    //create a var to hold the company preferences
    $scope.preferences  = {};


    //load preferences data data
    //$scope.artgrouptypes = $firebaseArray(filterRef);

    //If there was an error when loading the discipline data show it.
    // display any errors
    //$scope.artgrouptypes.$loaded().catch(showError);


    //Handles the account creation
    $scope.register= function() {

      //Validations are good so create account
      simpleLogin.createAccount($scope.email, $scope.pass, {rememberMe: true})
          .then(completeProfile, showError);

    };


    function completeProfile(company) {

      var profileData =  {artsGroup: $scope.artsGroup, phone: $scope.phone,
        preferences: $scope.preferences, 
        address: $scope.address, address_2: $scope.address_2,
        description: $scope.description, url: $scope.url, 
        company: true
        };

      //add account to our manage list of accounts
      profileSvc.addProfile(company.uid,profileHelperSvc.sanitizeArtGroupProfile(profileData), 'companies', flashSvc.error);

      //adding users to every preference
      updateCompanyPreferences(company);

    }

    function updateCompanyPreferences(company) {
     //sanitize preflist
     var preference_list = profileHelperSvc.sanitizePreferenceList($scope.preference_list); 
      preferenceSvc.addCompanyToPreferences(company.uid, preference_list);
      preferenceSvc.match(company.uid, $scope.preferences, 'candidates');
      //preferenceSvc.addUserToCompanies(userData.user.uid, $scope.preferences);
      //state.go(abmConfig.states.company.home);
    }

    //for each company that also share this preference
    // update the user on the companies user collection
    // update the company in the user company collection.
    function showError(err) {
      flashSvc.error(err);
    }


  });
