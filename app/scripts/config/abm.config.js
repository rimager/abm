/**
 * Created by io on 4/24/15.
 */
(function () {

  'use strict';

  var app = angular.module(window.appName);


  var profile = {
    type: {
      user: 'user',
      company: 'company'
    }
  };

  var states = {
    home: 'home',
    company: {
      home: 'account.artGroup.home'
    },
    user: {
      home: 'account.user.home'
    }
  };

  var config = {
    appErrorPrefix: 'abm error',
    profile: profile,
    states: states
  };

  //Make the config data available as a service
  app.factory('abmConfig', function (abmEvents, abmApiConfig) {

    //adding entries for redundancy
    config.api = abmApiConfig;
    config.events = abmEvents;

    return config;
  });


})(angular);
