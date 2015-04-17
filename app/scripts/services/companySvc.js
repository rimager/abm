/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('companySvc', ['profileSvc', companySvc]);

  function companySvc(profileSvc) {

    var company_url = 'companies';

    return {
      updateProfile: updateProfile,
      getPreferences: getPreferences,
      setPreferences: setPreferences


    };

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
