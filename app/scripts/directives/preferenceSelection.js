angular.module(window.appName)
  .directive('abmPreferenceSelection', [ function () {
    'use strict';
    return {
      restrict: 'AE',
      scope: {
         preferenceTitle: '=',
         preferenceSubtitle: '=',
         preferenceList:  '=',
         model: '='
      },
      templateUrl: './views/preference_selection.html'
    };
  }]);
