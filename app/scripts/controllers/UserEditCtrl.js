'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:UserEditCtrl
 * @description
 * # UserEditCtrl
 * Manages authentication to any active providers.
 */
angular.module(window.appName)
  .controller('UserEditCtrl', function ($scope, simpleLogin, fbutil,
                                            $firebaseArray,
                                        abmConfig,
                                        $state,
                                        accountSvc,
                                        profile,
                                        userSvc, flashSvc) {

    $scope.user = profile;


    //load preferences data data
    $scope.artgrouptypes = $firebaseArray(fbutil.ref(abmConfig.api.filters.artgrouptypes));
    $scope.userAttributes = {};

    //load all the attributes
    $scope.userAttributes.age = $firebaseArray(fbutil.ref(abmConfig.api.user_attributes, 'age'));
    $scope.userAttributes.time_availability = $firebaseArray(fbutil.ref(abmConfig.api.user_attributes, 'time_availability'));
    $scope.userAttributes.donations = $firebaseArray(fbutil.ref(abmConfig.api.user_attributes, 'donations'));
    $scope.userAttributes.business_skills = $firebaseArray(fbutil.ref(abmConfig.api.user_attributes, 'business_skills'));
    $scope.userAttributes.in_kind_donations = $firebaseArray(fbutil.ref(abmConfig.api.user_attributes, 'in_kind_donations'));
    $scope.userAttributes.demographic = $firebaseArray(fbutil.ref(abmConfig.api.user_attributes, 'demographic'));
    $scope.userAttributes.previously_served = $firebaseArray(fbutil.ref(abmConfig.api.user_attributes, 'previously_served'));
    $scope.userAttributes.benefits = $firebaseArray(fbutil.ref(abmConfig.api.user_attributes, 'benefits'));



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
