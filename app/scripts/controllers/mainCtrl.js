'use strict';

/**
 * @ngdoc function
 * @name abmApp.controller:LayoutCtrl
 * @description
 * # LayoutCtrl
 * Controller of the abmApp
 */
angular.module(window.appName)
  .controller('MainCtrl', function ($scope) {

   //Do some aninmation on elementes on the main view
   //onScrollInit comes from a outside script
   onScrollInit( $('.os-animation') );


  });
