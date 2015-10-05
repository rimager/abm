'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:ArtGroupAccountCtrl
 * @description
 * # ArtGroupAccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module(window.appName)
  .controller('ArtGroupAccountCtrl', function ($scope, $state, account, safeApply,  listingSvc) {
    $scope.account = account;
    $scope.matches= [];
    $scope.preferences = [];

    listingSvc.getCandidatesForCompany(account.uid, addCandidate);
   
    function addCandidate(key, candidate) {
      safeApply(function () {$scope.matches.push(candidate);});
    }

    //matching preferences
    //listingSvc.getPreferences(profile.preferences, 'artgrouptype')

  });
