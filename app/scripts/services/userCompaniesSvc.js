/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('userCompaniesSvc', ['fbutil', userCompaniesSvc]);

  function userCompaniesSvc(fbutil) {

    var user_companies_url = 'user_companies';

    return {
      addCompaniesToUser: addCompaniesToUser
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
    function addCompaniesToUser(userId, preferenceList) {

      var userCompaniesRef = fbutil.ref(user_companies_url);
      var preferenceCompanyRef; companyList;
      var companyObj;


      //for every preference in this list, add the user id with value true
      angular.forEach(preferenceList, function(value, key) {
        if (value) {

          //get the companyList for this preferences


          companyObj = {};
          companyObj[companyId] = value;
          //prefChild = prefRef.child(key);
          prefChild.update(companyObj);
        }
      })

    }

  }


})(angular);
