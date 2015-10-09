'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:UserEditCtrl
 * @description
 * # UserEditCtrl
 * Manages authentication to any active providers.
 */
angular.module(window.appName)
  .controller('UserEditCtrl', function ($scope, $state, account,
                                        preferenceSvc,
                                        profileSvc,
                                        profileHelperSvc,
                                        safeApply, flashSvc) {

      $scope.account = account;

      //get time availability and minimun donations
      preferenceSvc.getFilters( function(filters) {


        safeApply(function() {
          $scope.filters = filters;
          $scope.time_availability = profileHelperSvc.objectToArray(filters.time_availability);
          $scope.minimum_donation = profileHelperSvc.objectToArray(filters.donations);

        })});



    //Handles the account creation
    $scope.updateProfile = function() {

      //add account to our manage list of accounts
      profileSvc.addProfile($scope.account.uid,profileHelperSvc.sanitizeCandidateProfile($scope.account), 'candidates', flashSvc.error);
      updatePreferences(account);


    };

    function updatePreferences(account) {
      var preference_list = profileHelperSvc.sanitizePreferenceList($scope.account.preferences);
      preferenceSvc.addUserToPreferences(account.uid, preference_list);
      preferenceSvc.match(account.uid, preference_list, 'companies', $scope.account.time_availability, $scope.account.minimum_donation);

      //$state.go(abmConfig.states.user.home);
    }



  });
