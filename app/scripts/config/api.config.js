/**
 * Created by io on 4/24/15.
 */
(function () {

  'use strict';

  var app = angular.module(window.appName);


  var api = {
    accounts: 'accounts'
  };


  //Make the config data available as a service
  app.factory('abmApiConfig', [function () {
    return api;
  }]);


})(angular);
