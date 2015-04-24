'use strict';

angular.module(window.appName)



  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$stateProvider',  function($stateProvider) {

    $stateProvider
      .state('artGroup', {
        url: 'art_group',
        abstract: true,
        templateUrl: "../../views/art_groups/index.html",
        resolve: {
          user:  ['simpleLogin', 'companySvc', function(simpleLogin, companySvc) {
            var loggedUser = simpleLogin.getUser();
            return companySvc.getProfile(loggedUser.uid);
          }]
        }
      })
      .state('artGroup.account', {
        url: '',
        templateUrl: "../../views/art_groups/account.html",
        controller: 'ArtGroupAccountCtrl'
      })
      .state('artGroup.edit', {
        url: '',
        templateUrl: "../../views/art_groups/edit.html",
        controller: 'ArtGroupEditCtrl'
      })

  }]);
