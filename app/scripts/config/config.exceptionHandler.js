// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function () {
  'use strict';

  var app = angular.module(window.appName);

  // Configure by setting an optional string value for appErrorPrefix.
  // Accessible via config.appErrorPrefix (via config value).

  app.config(['$provide', function ($provide) {
    $provide.decorator('$exceptionHandler',
      ['$delegate', 'abmConfig', 'loggerSvc', extendExceptionHandler]);
  }]);

  // Extend the $exceptionHandler service to also display a toast.
  function extendExceptionHandler($delegate, abmConfig, logger) {
    var appErrorPrefix = abmConfig.appErrorPrefix;
    var logError = logger.getLogFn('app', 'error');
    return function (exception, cause) {


      $delegate(exception, cause);


      var errorData = { exception: exception.toString(), stack: exception.stack.toString().substring(0, 63999), cause: cause };
      var msg = appErrorPrefix + exception.message;


      logError(msg, errorData, false);
    };
  }
})();
