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
      templateUrl: './views/preference_selection.html',
      link: function(scope, element, attrs) {
         scope.directiveModel = scope.model;
         scope.$watchCollection('directiveModel', function(newValue, oldValue)
           {
                scope.model = angular.extend({}, scope.model, newValue);
           })
        }
    };
  }]);
