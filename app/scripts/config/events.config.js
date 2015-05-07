/**
 * Created by io on 4/24/15.
 */
(function () {

  'use strict';

  var app = angular.module(window.appName);


  var events = {
    profile: {
      error: 'profile.error'
    },
    account: {
      loaded: 'account.loaded',
      loggedOut: 'account.loggedOut'
    }
  };

  //Make the config data available as a service
  app.factory('abmEvents', [function () {
    return events;
  }]);


})(angular);
