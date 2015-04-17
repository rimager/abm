/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('profileSvc', ['fbutil', '$firebaseObject', 'wrapPromiseSvc', profileSvc]);

  function profileSvc(fbutil,  $firebaseObject, wrapPromiseSvc) {


    return {
      updateProfile: updateProfile,
      getPreferences: getPreferences,
      setPreferences: setPreferences


    };


    function updateProfile(resource_url, uid, data, cb) {
      var ref = fbutil.ref(resource_url, uid);
      ref.update(data, cb);
    }

    function getPreferences(resource_url, uid) {
      var ref = fbutil.ref(resource_url, uid, 'preferences');
      return $firebaseObject(ref).$loaded();
    }

    function setPreferences(resource_url, uid, preferencesObj) {
      var ref =  fbutil.ref(resource_url, uid, 'preferences');
      return wrapPromiseSvc(ref, 'set', preferencesObj);
    }

  }


})(angular);
