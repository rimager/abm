'use strict';

angular.module(window.appName)



  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$stateProvider', '$locationProvider', function($stateProvider) {

    $stateProvider
      .state('artGroup', {
        url: '/art_group',
        abstract: true,
        templateUrl: "art_groups/index.html",
        resolve: {
          user:  ['simpleLogin', 'companySvc', function(simpleLogin, companySvc) {
            var loggedUser = simpleLogin.getUser();
            return companySvc.getProfile(loggedUser.uid + 'sdfdsf');
          }]
        }
      })
      .state('artGroup.account', {
        url: '',
        templateUrl: "art_groups/account.html",
        controller: 'ArtGroupHomeCtrl'
      })
      .state('artGroup.edit', {
        url: '',
        templateUrl: "art_groups/edit.html",
        controller: 'ArtGroupEditCtrl'
      })

  }]);
