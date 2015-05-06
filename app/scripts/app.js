'use strict';

/**
 * @ngdoc overview
 * @name abmApp
 * @description
 * # abmApp
 *
 * Main module of the application.
 */

//add this global variable for the app name
window.appName = 'abmApp';

var app  = angular.module(window.appName, [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.utils',
    'simpleLogin',
    'validation.match',
    'ui.router',
    'angular-loading-bar'

  ]);

app.run(['$rootScope', '$state', 'simpleLogin', 'abmConfig', 'accountSvc',
  function($rootScope, $state, simpleLogin, abmConfig, accountSvc) {
    // watch for login status changes and redirect if appropriate
    simpleLogin.watch(check, $rootScope);

    // some of our routes may reject resolve promises with the special {authRequired: true} error
    // this redirects to the login page whenever that is encountered

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if( angular.isObject(error) && error.authRequired ) {
        $state.go(abmConfig.states.home)
      }
    });

    function check(user) {
      if( !user && authRequired($state.current.name) ) {
        $state.go(abmConfig.states.home);
      }
      else if (user) {
        //make sure we are no registering
        if ($state.current.name !== 'home' && $state.current.name !== 'artGroupRegister' ) {
          //load account to determine the type and redirect accordingly
          accountSvc.getAccount(user.uid);
        }
      }

    }

    function authRequired(stateName) {
      return  stateName.indexOf('account') === 0;
    }
  }
]);
