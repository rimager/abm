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

    var currentUser = null;

    $scope.currentState = $state.current.name;

    $scope.logout = function() {
      currentUser =  null;
      simpleLogin.logout();
    };

    $scope.gotToMyAccount = function() {

      if (!currentUser) {
        $state.go(abmConfig.states.home);
        return
      }

      var gotoState =  currentUser.company
        ? abmConfig.states.company.home
        : abmConfig.states.user.home;


      $state.go(gotoState);

    };



    //listen to login logout events
    simpleLogin.watch(function(profile) {

      if (profile) {
        accountSvc.getAccount(profile.uid).then(function (account)  {

        //only navigate if we know the type of account as this time
        if (account.company ==  null || account.company == undefined)
            return;

        currentUser = account;
        $scope.gotToMyAccount();

      })
      } else {
      //no profile so go to home page
        $scope.gotToMyAccount();
      }
    });


    //Event listeners
    $scope.$on(abmConfig.events.profile.error, function(e, data) {
      flashSvc.error(data.message);
      currentUser = null;
      $state.go('home');
    });

    $scope.showError = function(err) {
      flashSvc.error(err);
    }

  });
