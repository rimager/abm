'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:UserAccountCtrl
 * @description
 * # UserAccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module(window.appName)
  .controller('UserAccountCtrl',
  function ($scope, $state, account, accountSvc, safeApply,  listingSvc) {

    $scope.account = account;
    $scope.matches= [];
    $scope.preferences = [];


    //neeed to watch for changes in the account and match
    accountSvc.watchAccount(account.uid, 'candidates',  function(data) {
      safeApply(function() {
        $scope.account = angular.extend({}, $scope.account, data);
      })});

    listingSvc.getCompaniesForCandidate(account.uid, addMatch);

    function addMatch(key, match) {
      safeApply(function () {$scope.matches.push(match);});
    }



  });
