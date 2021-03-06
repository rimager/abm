/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('userSvc', userSvc);

  function userSvc(profileSvc, abmConfig) {

    var user_url = abmConfig.api.profiles.users;

    return {
      updateProfile: updateProfile,
      getPreferences: getPreferences,
      setPreferences: setPreferences
    };


    function updateProfile(userUid, data, cb) {
      profileSvc.updateProfile(user_url, userUid, data, cb);
    }

    function getPreferences(uid) {
      return profileSvc.getPreferences(user_url, uid);
    }

    function setPreferences(uid, preferencesObj) {
      return profileSvc.setPreferences(user_url, uid, preferencesObj);
    }

  }


})(angular);
