/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('userSvc', ['fbutil', '$q', userSvc]);

  function userSvc(fbutil, $q) {

    var user_url = 'preferences_users';

    return {
      updateProfile: updateProfile
    };


    function updateProfile(userUid, data, cbFn) {
      var ref = fbutil.ref('users', userUid);
      ref.update(data, cbFn);
    }

  }


})(angular);
