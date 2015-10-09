'use strict';
/**
 * @ngdoc function
 * @name abmApp.controller:UserRegisterCtrl
 * @description
 * # UserRegisterCtrl
 * Manages authentication to any active providers.
 */
angular.module(window.appName)
  .controller('CandidateRegisterCtrl', function ($scope, simpleLogin,
                                        $state,
                                        profileSvc,
                                        flashSvc) {

    //Handles the account creation
    $scope.createAccount = function(email, pass, confirm) {

      //Validations are good so create account
      simpleLogin.createAccount(email, pass, {rememberMe: true})
          .then(completeProfile, flashSvc.error);

    };


    function completeProfile(profile) {

        if (!profile)
            return;

        var profileData = {name: $scope.name, company: false};

        profileSvc.addProfile(profile.uid, profileData, 'candidates', function (err) {
            if (!err)
                $state.go('account.user.edit');
            else
                flashSvc.error
        })
    }




  });
