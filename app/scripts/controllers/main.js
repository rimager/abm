'use strict';

/**
 * @ngdoc function
 * @name abmApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the abmApp
 */
angular.module('abmApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
