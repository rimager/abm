'use strict';

angular.module(window.appName)



  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$stateProvider',  function($stateProvider) {

    $stateProvider
      .state('account.artGroup', {
        url: '/art_group',
        abstract: true,
        templateUrl: "../../views/art_groups/index.html",
        resolve: {
          profile:  function(authSvc) {
            return authSvc.authorizeCompany(account)
          }
        }
      })
      .state('account.artGroup.home', {
        url: '',
        templateUrl: "../../views/art_groups/account.html",
        controller: 'ArtGroupAccountCtrl'
      })
      .state('account.artGroup.edit', {
        url: '',
        templateUrl: "../../views/art_groups/edit.html",
        controller: 'ArtGroupEditCtrl'
      })

  }]);
