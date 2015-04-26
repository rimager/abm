/**
 * Created by io on 4/24/15.
 */
(function () {

  'use strict';

  var app = angular.module(window.appName);


  var profile = {
    type: {
      user: 'user',
      artGroup: 'artgroup'
    }
  };

  var config = {
    profile: profile
  };

  //Make the config data available as a service
  app.factory('abmConfig', [function () {
    return config;
  }]);


})(angular);
