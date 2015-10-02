/**
 * @ngdoc function
 * @name abmApp.directive:ngShowAuth
 * @description
 * # ngShowAuthDirective
 * A directive that shows elements only when user is logged in. It also waits for simpleLogin
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module(window.appName)
  .directive('ngShowAuth', ['abmConfig', '$timeout', function (abmConfig, $timeout) {
    'use strict';

    var isLoggedIn = false;

    return {
      restrict: 'A',
      scope: true,
      link: function(scope, el, attr) {
        el.addClass('ng-cloak'); // hide until we process it

        scope.$on(abmConfig.events.account.loaded, function(e, data) {
          isLoggedIn =  (attr.isUser === true && data.isUser);
          update();
        });

        scope.$on(abmConfig.events.account.loggedOut, function(e, data) {
          isLoggedIn = false;
          update();
        });

        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability
          $timeout(function () {
            el.toggleClass('ng-cloak', !isLoggedIn);
          }, 0);
        }

      }
    };
  }]);
