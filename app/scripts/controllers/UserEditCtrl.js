'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:UserRegisterCtrl
 * @description
 * # UserRegisterCtrl
 * Manages authentication to any active providers.
 */
angular.module(window.appName)
  .controller('UserRegisterCtrl', function ($scope, simpleLogin, fbutil,
                                            $firebaseArray,
                                            $firebaseOjbect,
                                        abmConfig,
                                        $state,
                                        accountSvc,
                                        profile,
                                        userSvc, flashSvc) {

    $scope.user = profile;


    //load preferences data data
    $scope.artgrouptypes = $firebaseArray(fbutil.ref(abmConfig.api.filters.artgrouptypes));


    //load all user attribute questions
    $scope.userAttributes = $firebaseObject(fbutil.ref(abmConfig.api.user_attributes));

    //Handles the account creation
    $scope.updateProfile = function() {

      var user = $scope.user;

      //adding profile data
      userSvc.updateProfile(user.uid, $scope.user, flashSvc.error);

      //adding users to every preference
      updateUserPreferences(user);

    };

    function updateUserPreferences(user) {
      preferenceSvc.addUserToPreferences(user.uid, $scope.user.preferences);

      $state.go(abmConfig.states.user.home);
    }

    function afterUpdateProfile(err) {
      if (!err) {
        $state.go('account.user.edit');
      }
      else {
        showError(err);
      }
    }

    function showError(err) {
      flashSvc.error(err);
    }


  });
