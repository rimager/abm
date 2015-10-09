'use strict';

angular.module(window.appName)



  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$stateProvider',  function($stateProvider) {

    $stateProvider
      .state('account.user', {
        url: '/user',
        abstract: true,
        templateUrl: "../../views/users/index.html",
      })
      .state('account.user.home', {
        url: '',
        templateUrl: "../../views/users/account.html",
        controller: 'UserAccountCtrl'
      })
      .state('account.user.edit', {
        url: '/edit',
        templateUrl: "../../views/users/edit.html",
        controller: 'UserEditCtrl'
      })

  }]);
