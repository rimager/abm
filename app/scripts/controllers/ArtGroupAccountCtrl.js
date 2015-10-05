'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:ArtGroupAccountCtrl
 * @description
 * # ArtGroupAccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module(window.appName)
  .controller('ArtGroupAccountCtrl', function ($scope, $state, account, simpleLogin, fbutil, companyUsersSvc, listingSvc) {
    $scope.account = account;
    $scope.matches= [];
    $scope.preferences = [];

    //matching users
    fbutil.ref('matches_for_companies').child(account.uid).once('value', function(candidateList) {
      var candidates = candidateList.val();
      listingSvc.getCandidates(candidatesList, function(fullCandidate) {
         $scope.matches.push(fullCandidate);
      }); 
    })

    //matching preferences
    listingSvc.getPreferences(profile.preferences, 'artgrouptype')
      .then(function(list) {
        $scope.preferences = list;
      });


    //var profile;
    //loadProfile(user);


    function loadProfile(user) {
      if( profile ) {
        profile.$destroy();
      }
      profile = fbutil.syncObject('companies/'+user.uid);
      profile.$bindTo($scope, 'profile');
    }
  });
