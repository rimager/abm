'use strict';
/**
 * @ngdoc function
 * @name muck2App.controller:ArtGroupAccountCtrl
 * @description
 * # ArtGroupAccountCtrl
 * Provides rudimentary account management functions.
 */
angular.module(window.appName)
  .controller('ArtGroupAccountCtrl', function ($scope, $state, profile, simpleLogin, fbutil, companyUsersSvc, listingSvc) {
    $scope.user = profile;
    $scope.users = [];
    $scope.preferences = [];

    //matching users
    companyUsersSvc.matchUsersByPreferenceToCompany(profile.preferences)
      .then(function(list) {
        return listingSvc.getUsers(list);
      })
      .then(function (list) {
        $scope.users = list;
      } );


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
