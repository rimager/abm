/**
 * Created by io on 4/24/15.
 */
(function () {

  'use strict';

  var app = angular.module(window.appName);


  var api = {
    accounts: 'accounts',
    profiles: {
      users: 'users',
      companies: 'companies'
    },
    filters: {
      artgrouptypes: 'filters/artgrouptype'
    }
  };


  //Make the config data available as a service
  app.factory('abmApiConfig', [function () {
    return api;
  }]);


})(angular);
