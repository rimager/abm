/**
 * Created by io on 3/22/15.
 */

(function(){

  'use strict';

  angular.module('abmApp').factory('errorSvc',[errorSvc]);

  var erroMappings = [];
  erroMappings['NETWORK_ERROR'] = 'Unable to connect to server. Please try again later';

  function errorSvc(){

    var service = {
      getError: getError
    };
    return service;


    function getError(err) {

      return  ( (typeof err) === 'string' )
              ? err
              : parseErr(err);
    }

    function parseErr(err) {

      if (erroMappings[err.code])
         return erroMappings[err.code];

       return (err.message)
              ? err.message
              : 'Something went wrong. Please contact admin for help';
    }


  }

})();
