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

angular.module(window.appName, [
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
    'ui.router'

  ]);
