/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('preferenceSvc', ['fbutil', preferenceSvc]);

  function preferenceSvc(fbutil) {

    var preferences_companies_url = 'preferences_companies';
    var preferences_users_url = 'preferences_users';


    return {
      addCompanyToPreferences: addCompanyToPreferences,
      addUserToPreferences: addUserToPreferences
    };


    /**
     *
     * @param uid
     * @param preferenceList
     *
     * Add user to the user list of each preference
     * At the preferences_users location:
     * preferences_companies : {
     *   preference_1: {company_1: true}
     *   preference_2: {company_2: true}
     * }
     *
     */

    function addCompanyToPreferences(uid, preferenceList) {
      addItemToPreferences(uid, preferenceList, preferences_companies_url);
    }
    function addUserToPreferences(uid, preferenceList) {
      addItemToPreferences(uid, preferenceList, preferences_users_url);
    }


    function addItemToPreferences(uid, preferenceList, url) {

      var prefChild;
      var itemAdded;
      var prefRef = fbutil.ref(url);


      //for every preference in this list, add the user id with value true
      angular.forEach(preferenceList, function(value, key) {
        if (value) {
          itemAdded = {};
          itemAdded[uid] = value;
          prefChild = prefRef.child(key);
          prefChild.update(itemAdded);
        }
      })

    }

  }


})(angular);
