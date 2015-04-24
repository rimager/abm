/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('companyUsersSvc', ['fbutil', 'preferenceSvc', companyUsersSvc]);

  function companyUsersSvc(fbutil,  preferenceSvc) {

    var company_users_url = 'companies';

    return {
      matchUsersByPreferenceToCompany: matchUsersByPreferenceToCompany,
      matchCompaniesByPreferenceToUser: matchCompaniesByPreferenceToUser,
      persistUsersForCompany: persistUsersForCompany
    };


    /**
     *
     * @param preferenceList
     * @returns Promise with a list of users that match a preference List
     */
    function matchUsersByPreferenceToCompany(preferenceList) {
      return preferenceSvc.matchByPreference('users', preferenceList);
    }

    /**
     *
     * @param preferenceList
     * @returns Promise with a list of companies that match a preference List
     */
    function matchCompaniesByPreferenceToUser(preferenceList) {
      return preferenceSvc.matchByPreference('companies', preferenceList);
    }

    function persistUsersForCompany(companyId, usersToAdd) {
      var companiesUserRef = fbutil.ref(company_users_url).child(companyId).child('users');
      companiesUserRef.set(usersToAdd);
    }

  }


})(angular);
