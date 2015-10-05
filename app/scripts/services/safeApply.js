(function(){
  'use strict';

  angular.module(window.appName).factory('safeApply', ['$rootScope', safeApply]);

  function safeApply($rootScope){

    return function(fn){
      var phase = $rootScope.$$phase;
      if(phase == '$apply' || phase == '$digest') {
        if(fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        $rootScope.$apply(fn);
      }
    }
  }
})();
;
