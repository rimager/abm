/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('companySvc',companySvc);

  function companySvc(profileSvc, abmConfig) {

    var company_url =   abmConfig.api.profiles.companies;

    return {
      updateProfile: updateProfile,
      getPreferences: getPreferences,
      setPreferences: setPreferences,
      getProfile: getProfile
    };


    function getProfile(uid) {
      return profileSvc.getProfile(company_url, uid);
    }


    function updateProfile(userUid, data, cb) {
      profileSvc.updateProfile(company_url, userUid, data, cb);
    }

    function getPreferences(uid) {
      return profileSvc.getPreferences(company_url, uid);
    }

    function setPreferences(uid, preferencesObj) {
      return profileSvc.setPreferences(company_url, uid, preferencesObj);
    }

  }


})(angular);
