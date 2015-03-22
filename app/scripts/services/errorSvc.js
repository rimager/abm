/**
 * Created by io on 3/22/15.
 */

(function(){

  'use strict';

  angular.module('abmApp').factory('errorSvc',[errorSvc]);

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
       return (err.message)
              ? err.message
              : 'Something went wrong. Please contact admin for help';
    }


  }

})();
