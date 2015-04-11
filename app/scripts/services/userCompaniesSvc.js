/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('userCompaniesSvc', ['fbutil', '$firebase',  userCompaniesSvc]);

  function userCompaniesSvc(fbutil, $firebase) {

    var user_companies_url = 'users';

    return {
      addCompaniesByPreferencesToUser: addCompaniesByPreferencesToUser
    };


    /**
     *
     * @param uid
     * @param preferenceList
     *
     * Find companies that match this preferenlist and add them to the user
     * At the user_companies/user_id location:
     * user_companies/user_id : {
     *   company_1: {preference_1: true, preference_2: true}
     *   company_2: {preference_2: true, preference_3: true}
     * }
     *
     */
    //
    function addCompaniesByPreferencesToUser(userId, preferenceList) {

      var preferenceCompanyRef = fbutil.ref('preferences_companies');

      //for every preference in this list, add the user id with value true
      angular.forEach(preferenceList, function(value, preferenceKey) {
        if (value) {
          //get the companyList for this preferences

          addCompaniesToUser(userId,
            $firebase(preferenceCompanyRef.child(preferenceKey)).$asArray(),
                             preferenceKey);

        }
      })

    }

    function addCompaniesToUser(userId, companyList, preferenceKey) {
      var companiesToAdd = {};
      var company;
      var userCompaniesRef = fbutil.ref(user_companies_url).child(userId).child('companies');

      companyList.$loaded().then(function (companies) {

        //for every preference in this list, add the user id with value true
        for (var i = 0; i < companies.length; i++) {
          company = companies[i];

          companiesToAdd[company.$id] = {};
          companiesToAdd[company.$id][preferenceKey] = true;
        }

        userCompaniesRef.update(companiesToAdd);

      })

    }


  }


})(angular);
