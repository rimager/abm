'use strict';

/**
 * @ngdoc function
 * @name abmApp.controller:LayoutCtrl
 * @description
 * # LayoutCtrl
 * Controller of the abmApp
 */
angular.module(window.appName)
  .controller('LayoutCtrl', function ($scope, $state, simpleLogin, flashSvc, abmConfig, accountSvc) {

    $scope.currentState = $state.current.name;

    $scope.logout = function() {
      simpleLogin.logout();
    };

    //listen to login logout events
    simpleLogin.watch(function(profile) {
      accountSvc.getAccount(profile.uid).then(function (account)  {
         
      var gotoState = account.company
         ? abmConfig.states.company.home
         : abmConfig.states.user.home;
      $state.go(gotoState);
      })
    });


    //Event listeners
    $scope.$on(abmConfig.events.profile.error, function(e, data) {
      flashSvc.error(data.message);
      $state.go('home');
    });

    $scope.showError = function(err) {
      flashSvc.error(err);
    }

  });
