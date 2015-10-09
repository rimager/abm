'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:ArtGroupAccountCtrl
 * @description
 * # ArtGroupAccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module(window.appName)
  .controller('ArtGroupAccountCtrl', function ($scope, $state, accountSvc, safeApply,  listingSvc) {
    $scope.account = account;
    $scope.matches= [];
    $scope.preferences = [];


    //neeed to watch for changes in the account and match
    accountSvc.watchAccount(account.uid, 'companies', function(data) {
        safeApply(function() {
           $scope.account = data;
        });
    });

    listingSvc.getCandidatesForCompany(account.uid, addCandidate);
   
    function addCandidate(key, candidate) {
      safeApply(function () {$scope.matches.push(candidate);});
    }

    //matching preferences
    //listingSvc.getPreferences(profile.preferences, 'artgrouptype')

  });
