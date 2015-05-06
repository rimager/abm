'use strict';

/**
 * @ngdoc function
 * @name abmApp.controller:LayoutCtrl
 * @description
 * # LayoutCtrl
 * Controller of the abmApp
 */
angular.module(window.appName)
  .controller('LayoutCtrl', function ($scope, $state, simpleLogin, flashSvc, abmConfig, companyUsersSvc, listingSvc) {

    $scope.currentState = $state.current.name;

    $scope.logout = function() {
      simpleLogin.logout();
    };

    //TODO: Test. Delete
    //var prefList =  {
    //  "artgrouptype_film": true,
    //  "artgrouptype_literaty": true,
    //  "artgrouptype_media": true,
    //  "artgrouptype_museum_dace": true,
    //  "artgrouptype_museum_visual_art": true,
    //  "artgrouptype_music": true
    //};


    //companyUsersSvc.matchCompaniesByPreferenceToUser(prefList)
    //  .then(function (res)  {
    //    console.log(res);
    //  },
    //function (fail) {
    //  console.log(fail)
    //});
    //
    //listingSvc.getCompanies({'simplelogin:25': {a: true, b:true}, 'simplelogin:26': {c: true, d:true} })
    //  .then(function (res)  {
    //    console.log(res);
    //  },
    //  function (fail) {
    //    console.log(fail)
    //  });


    //Event listeners
    $scope.$on(abmConfig.events.profile.error, function(e, data) {
      flashSvc.error(data.message);
      $state.go('home');
    });

    //Once the account is loaded we know what type of account it is
    $scope.$on(abmConfig.events.account.loaded, function(e, data) {

      var gotoState = data.isUser
         ? abmConfig.states.user.home
         : abmConfig.states.company.home;
      $state.go(gotoState);

    });

    $scope.showError = function(err) {
      flashSvc.error(err);
    }

  });
