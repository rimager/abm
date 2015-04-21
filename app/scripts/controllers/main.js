'use strict';

/**
 * @ngdoc function
 * @name abmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the abmApp
 */
angular.module('abmApp')
  .controller('MainCtrl', function ($scope, companyUsersSvc, listingSvc) {


    //TODO: Test. Delete
    var prefList =  {
      "artgrouptype_film": true,
      "artgrouptype_literaty": true,
      "artgrouptype_media": true,
      "artgrouptype_museum_dace": true,
      "artgrouptype_museum_visual_art": true,
      "artgrouptype_music": true
    };


    companyUsersSvc.matchCompaniesByPreferenceToUser(prefList)
      .then(function (res)  {
        console.log(res);
      },
    function (fail) {
      console.log(fail)
    });



    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
