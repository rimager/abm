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

      if (profile) {
        accountSvc.getAccount(profile.uid).then(function (account)  {

        //only navigate if we know the type of account as this time
        if (account.company ==  null || account.company == undefined)
            return;

        var gotoState = account.company
           ? abmConfig.states.company.home
           : abmConfig.states.user.home;
        $state.go(gotoState);
      })
      } else {
      //no profile so go to home page
        $state.go(abmConfig.states.home);
      }
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
