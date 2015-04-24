/**
 * Created by io on 3/22/15.
 */

(function(){

  'use strict';

  angular.module(window.appName).factory('wrapPromiseSvc', ['$q', 'errorSvc', wrapPromiseSvc]);

  function wrapPromiseSvc( $q, errorSvc ){

   return function wrapCallBack(ref, fn, data) {

      var deferred = $q.defer();

     ref[fn](data, function(err, response) {
       err ? deferred.reject(errorSvc.getError(err)) :
         deferred.resolve(response);
     });

      return deferred.promise;

    }



  }

})();
