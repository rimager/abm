'use strict';

/**
 * @ngdoc function
 * @name abmApp.controller:LayoutCtrl
 * @description
 * # LayoutCtrl
 * Controller of the abmApp
 */
angular.module(window.appName)
  .controller('LayoutCtrl', function ($scope, $state, simpleLogin, flashSvc, abmEvents, companyUsersSvc, listingSvc) {

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
    $scope.$on(abmEvents.profile.error, function(e, data) {
      flashSvc.error(data.message);
      $state.go('home');
    });

    $scope.showError = function(err) {
      flashSvc.error(err);
    }

  });
