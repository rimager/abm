'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:UserEditCtrl
 * @description
 * # UserEditCtrl
 * Manages authentication to any active providers.
 */
angular.module(window.appName)
  .controller('UserEditCtrl', function ($scope, $state, account,accountSvc,
                                        preferenceSvc,
                                        profileSvc,
                                        profileHelperSvc,
                                        safeApply, flashSvc) {

      $scope.account = account;

        //neeed to watch for changes in the account and match
        accountSvc.watchAccount(account.uid, 'candidates',  function(data) {
            safeApply(function() {
                $scope.account = angular.extend({}, $scope.account, data);
            })});

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
      updatePreferences($scope.account);

      //redirect home
      flashSvc.success('Please see your matching Art Boards below', 'Your Profile has been updated!');
      $state.go('account.user.home');

    };

    function updatePreferences(account) {
      var preference_list = profileHelperSvc.sanitizePreferenceList(angular.extend({}, account.disciplines, account.business_skills,account.preferences));
      preferenceSvc.addUserToPreferences(account.uid, preference_list);
      preferenceSvc.match(account.uid, 'companies', account.disciplines, account.business_skills, account.minimum_donation);

      //$state.go(abmConfig.states.user.home);
    }



  });
