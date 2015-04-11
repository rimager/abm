/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('preferenceUserSvc', ['fbutil', 'flashSvc', preferenceUserSvc]);

  function preferenceUserSvc(fbutil, flashSvc) {

    var preferences_user_url = 'preferences_users';

    return {
      addUserToPreferences: addUserToPreferences
    };


    /**
     *
     * @param uid
     * @param preferenceList
     *
     * Add user to the user list of each preference
     * At the preferences_users location:
     * preferences_users : {
     *   preference_1: {user1: true}
     *   preference_2: {user1: true}
     * }
     *
     */
    //
    function addUserToPreferences(uid, preferenceList) {

      var prefChild;
      var userObj;
      var prefRef = fbutil.ref(preferences_user_url);


      //for every preference in this list, add the user id with value true
      angular.forEach(preferenceList, function(value, key) {
        if (value) {
          userObj = {};
          userObj[uid] = value;
          prefChild = prefRef.child(key);
          prefChild.update(userObj, flashSvc.error);
        }
      })

    }

  }


})(angular);