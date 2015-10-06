'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:ArtGroupEditCtrl
 * @description
 * # ArtGroupEditCtrl
 * Provides rudimentary account management functions.
 */
angular.module(window.appName)
  .controller('ArtGroupEditCtrl', function ($scope, $state, account, preferenceSvc, profileSvc, profileHelperSvc,safeApply, flashSvc) {
    $scope.account = account;

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
      updateCompanyPreferences(account);
    }   


    function updateCompanyPreferences(company) {
     //sanitize preflist
     var preference_list = profileHelperSvc.sanitizePreferenceList($scope.account.preferences); 
      preferenceSvc.addCompanyToPreferences(account.uid, preference_list);
      preferenceSvc.match(account.uid, preference_list, 'candidates', $scope.account.time_availability, $scope.account.minimum_donation);
      //preferenceSvc.addUserToCompanies(userData.user.uid, $scope.preferences);
    }
  });
