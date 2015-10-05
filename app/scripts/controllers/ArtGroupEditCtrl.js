'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:ArtGroupEditCtrl
 * @description
 * # ArtGroupEditCtrl
 * Provides rudimentary account management functions.
 */
angular.module(window.appName)
  .controller('ArtGroupEditCtrl', function ($scope, $state, account, preferenceSvc, profileSvc, profileHelperSvc, flashSvc) {
    $scope.account = account;

    $scope.update = function () {


      //add account to our manage list of accounts
      profileSvc.addProfile($scope.account.uid,profileHelperSvc.sanitizeArtGroupProfile($scope.account), 'companies', flashSvc.error);
      updateCompanyPreferences(account);
    }   


    function updateCompanyPreferences(company) {
     //sanitize preflist
     var preference_list = profileHelperSvc.sanitizePreferenceList($scope.account.preferences); 
      preferenceSvc.addCompanyToPreferences(account.uid, preference_list);
      preferenceSvc.match(account.uid, preference_list, 'candidates');
      //preferenceSvc.addUserToCompanies(userData.user.uid, $scope.preferences);
    }
  });
