'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:MatchCtrl
 * @description
 * # Match
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('abmApp')
  .controller('MatchCtrl', function ($scope, user, fbutil, $timeout) {
    // synchronize a read-only, synchronized array of companies that matches
    $scope.companies = fbutil.syncArray('users/' + user.uid + '/companies', {});

    // display any errors
    $scope.companies.$loaded().catch(alert);

    // provide a method for adding a message
    //$scope.addMessage = function(newMessage) {
    //  if( newMessage ) {
    //    // push a message to the end of the array
    //    $scope.messages.$add({text: newMessage})
    //      // display any errors
    //      .catch(alert);
    //  }
    //};

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  });
