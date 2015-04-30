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
                                        abmConfig,
                                        $state,
                                        accountSvc,
                                        userSvc) {

    $scope.user = {};

    //Handles the account creation
    $scope.createAccount = function(email, pass) {

      //Validations are good so create account
      simpleLogin.createAccount(email, pass, {rememberMe: true})
          .then(completeProfile, showError);

    };


    function completeProfile(user) {

      if (!user)
         return;

      //add account to our manage list of accounts
      accountSvc.addAccount(user.uid,
        {type: abmConfig.profile.type.user});

      //adding profile data
      userSvc.updateProfile(user.uid, {name: $scope.user.name}
        , afterUpdateProfile);


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
      $scope.showError(err);
    }


  });
