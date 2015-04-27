/**
 * Created by io on 3/22/15.
 */
(function () {
  'use strict';

  angular.module(window.appName).factory('loggerSvc', [  '$log', 'flashSvc', logger]);

  function logger( $log, flash) {

    var service = {

      getLogFn: getLogFn,
      log: log,
      logError: logError,
      logSuccess: logSuccess,
      logWarning: logWarning,
      raiseError: raiseError

    };

    return service;

    function getLogFn(moduleId, fnName) {

      fnName = fnName || 'log';

      switch (fnName.toLowerCase()) { // convert aliases

        case 'success':
          fnName = 'logSuccess'; break;
        case 'error':
          fnName = 'logError'; break;
        case 'warn':
          fnName = 'logWarning'; break;
        case 'warning':
          fnName = 'logWarning'; break;
      }

      var logFn = service[fnName] || service.log;

      return function (msg, data, showFlash) {

        logFn(msg, data, moduleId, (showFlash === undefined) ? true : showFlash);
      };
    }

    function log(message, data, source, showFlash) {
      logIt(message, data, source, $log.info, showFlash, 'info');
    }

    function logWarning(message, data, source, showFlash) {
      logIt(message, data, source, $log.warn, showFlash, 'warning');
    }

    function logSuccess(message, data, source, showFlash) {
      logIt(message, data, source, $log.log, showFlash, 'success');
    }


    function UserException( message, data, name) {
      this.message = message;
      this.data = data;
      this.name = name || "UserException";
    }


    function raiseError(message, data, source, showFlash) {

      showFlash =  showFlash || false;
      logError(message, data, source, showFlash);
      throw new UserException(message, data, source);

    }



    function logError(message, data, source, showFlash) {
      logIt(message, data, source, $log.error, showFlash, 'error');
    }

    function logIt(message, data, source, write, showFlash, flashType) {

      source = source ? '[' + source + '] ' : '';

      write(source, message, data);

      //need to find a messaging system

      if (showFlash && toastr[flashType])
        flash.send(flashType, message);


    }
  }
})();
