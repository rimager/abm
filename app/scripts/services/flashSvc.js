/**
 * Created by io on 3/22/15.
 */

(function(){

  'use strict';

  angular.module('abmApp').factory('flashSvc',[flash]);

  function flash(){

    var service = {
      send: send,
      success: success,
      warming: warning,
      info: info,
      error: error,
      raiseInfo:raiseInfo,
      typeExists: typeExists,
      clear: clear
    };
    return service;


    var positionClass = 'toast-top-full-width';
    var closeButton = true;

    function success( body, header, onclickFn ) {
      send('success', body, header, onclickFn );
    }

    function info( body, header, onclickFn ) {
      send('info', body, header, onclickFn );
    }

    function warning( body, header, onclickFn ) {
      send('info', body, header, onclickFn );
    }

    function error( body, header, onclickFn ) {
      send('error', body, header, onclickFn );
    }


    function raiseInfo(body, header, onclickFn, closeButton) {
      positionClass = 'toast-bottom-full-width';
      closeButton = closeButton;
      info(body, header, onclickFn);
    }

    function clear() {
      toastr.clear();
    }

    function send(type, body, header, onclickFn){

      var timeOut  = (onclickFn) ? 0 : 5000;

      toastr.options = {
        "debug": false,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": timeOut,
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "swing",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
      };
      if(typeExists(type)){
        onclickFn = ( onclickFn ? onclickFn : false );
        toastr[type](body, header, { onclick: onclickFn, positionClass: positionClass, closeButton: closeButton })
      }
    }
    function typeExists(toastType){
      return toastr[toastType];
    }
  }

})();
