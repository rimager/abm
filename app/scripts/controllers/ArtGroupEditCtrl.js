'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:ArtGroupEditCtrl
 * @description
 * # ArtGroupEditCtrl
 * Provides rudimentary account management functions.
 */
angular.module(window.appName)
  .controller('ArtGroupEditCtrl', function ($scope, $state, account, accountSvc, preferenceSvc, profileSvc, profileHelperSvc,safeApply, flashSvc) {
    $scope.account = account;

        //neeed to watch for changes in the account and match
        //neeed to watch for changes in the account and match
        accountSvc.watchAccount(account.uid, 'companies',  function(data) {
            safeApply(function() {
                $scope.account = data;
            })});


   //get time availability and minimun donations
    preferenceSvc.getFilters( function(filters) {
    

      safeApply(function() {
       $scope.filters = filters;
       $scope.time_availability = profileHelperSvc.objectToArray(filters.time_availability);
       $scope.minimum_donation = profileHelperSvc.objectToArray(filters.donations);

      })});

    

    $scope.update = function () {

      //add account to our manage list of accounts
      profileSvc.addProfile($scope.account.uid,profileHelperSvc.sanitizeArtGroupProfile($scope.account), 'companies', flashSvc.error);
        updatePreferences($scope.account);
    };


    function updatePreferences(account) {
     //sanitize preflist
     var preference_list = profileHelperSvc.sanitizePreferenceList(angular.extend({}, account.disciplines, account.business_skills,account.preferences));
     preferenceSvc.addCompanyToPreferences(account.uid, preference_list);
     preferenceSvc.match(account.uid, 'candidates', account.disciplines, account.business_skills, account.minimum_donation);

    }
  });
