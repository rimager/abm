/**
 * @ngdoc function
 * @name abmApp.directive:ngShowAuth
 * @description
 * # ngShowAuthDirective
 * A directive that shows elements only when user is logged in. It also waits for simpleLogin
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module(window.appName)
  .directive('ngShowAuth', ['simpleLogin', '$timeout', 'safeApply', function (simpleLogin, $timeout, safeApply) {
    'use strict';

    var isLoggedIn = !!simpleLogin.getUser();
    simpleLogin.watch(function(user) {
      isLoggedIn = !!user;
    });
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, el, attr) {
        el.addClass('ng-cloak'); // hide until we process it

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            isLoggedIn === true ? el.removeClass('ng-cloak') : el.addClass('ng-cloak');
            //el.toggleClass('ng-cloak', !isLoggedIn);
          }, 0);
        }
        simpleLogin.watch(update, scope);

      }
    }
  }]);
