/**
 * Created by ioannissuarez on 6/20/14.
 */


(function() {

    'use strict';

    angular.module(window.appName).factory('broadcastSvc', ['$rootScope', broadcastSvc]);

    function broadcastSvc($rootScope) {

         return function() {
             return $rootScope.$broadcast.apply($rootScope, arguments);
         };


    }

})();
