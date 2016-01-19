
/**
 * @ngdoc function
 * @name abmApp.directive:ngHideAuth
 * @description
 * # ngHideAuthDirective
 * A directive that shows elements only when user is logged out. It also waits for simpleLogin
 * to be initialized so there is no initial flashing of incorrect state.
 */
angular.module(window.appName)
  .directive('ngHideAuth', ['simpleLogin', '$timeout', 'safeApply', function (simpleLogin, $timeout, safeApply) {
    'use strict';
    var isLoggedIn;
    simpleLogin.watch(function(user) {
      isLoggedIn = !!user;
    });

    return {
      restrict: 'A',
      scope: {},
      link: function(scope, el) {
        el.addClass('ng-cloak'); // hide until we process it
        function update() {
          // sometimes if ngCloak exists on same element, they argue, so make sure that
          // this one always runs last for reliability

          $timeout(function () {

            if (isLoggedIn === false) {
                el.removeClass('ng-cloak');
            }
            else {
              el.addClass('ng-cloak');
            }
            //el.toggleClass('ng-cloak', isLoggedIn !== false);

          }, 0);
        }

        simpleLogin.watch(safeApply(update), scope);
        simpleLogin.getUser(safeApply(update));
      }
    };
  }]);
