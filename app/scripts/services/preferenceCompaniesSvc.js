/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('preferenceCompaniesSvc', ['fbutil', preferenceCompaniesSvc]);

  function preferenceCompaniesSvc(fbutil) {

    var preferences_user_url = 'preferences_users';

    return {
      addCompanyToPreferences: addCompanyToPreferences
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
    //
    function addCompanyToPreferences(companyId, preferenceList) {

      var prefChild;
      var companyObj;
      var prefRef = fbutil.ref(preferences_user_url);


      //for every preference in this list, add the user id with value true
      angular.forEach(preferenceList, function(value, key) {
        if (value) {
          companyObj = {};
          companyObj[companyId] = value;
          prefChild = prefRef.child(key);
          prefChild.update(companyObj);
        }
      })

    }

  }


})(angular);
