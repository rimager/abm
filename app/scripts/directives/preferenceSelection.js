angular.module(window.appName)
  .directive('abmPreferenceSelection', [ function () {
    'use strict';
    return {
      restrict: 'AE',
      scope: {
         preferenceTitle: '=',
         preferenceSubtitle: '=',
         preferenceList:  '=',
         model: '=',
         controlType: '='
      },
      templateUrl: './views/preference_selection.html'
    };
  }]);
