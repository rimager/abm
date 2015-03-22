/**
 * Created by io on 3/22/15.
 */

(function(){

  'use strict';

  angular.module('abmApp').factory('wrapPromiseSvc', ['$q', 'errorSvc', wrapPromiseSvc]);

  function wrapPromiseSvc( $q, errorSvc ){

   return function wrapCallBack(fnToCall, data) {

      var deferred = $q.defer();

     fnToCall(data, function(err, response) {
       err ? deferred.reject(errorSvc.getError(err)) :
         deferred.resolve(response);
     });

      return deferred.promise;

    }



  }

})();
