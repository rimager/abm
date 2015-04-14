/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('companyUsersSvc', ['fbutil', '$firebase', '$q', companyUsersSvc]);

  function companyUsersSvc(fbutil, $firebase, $q) {

    var company_users_url = 'companies';

    return {
      addUsersByPreferencesToCompany: addUsersByPreferencesToCompany
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
    function addUsersByPreferencesToCompany(companyId, preferenceList) {

      var preferenceUsersRef = fbutil.ref('preferences_users');
      var usersToAdd = {};
      var preferenceListCount =  angular.isArray(preferenceList)
                                 ? preferenceList.length
                                 :   Object.keys(preferenceList).length;
      var preferenceListProcessed = 0;

      //for every preference in this list, add the user id with value true
      angular.forEach(preferenceList, function(value, preferenceKey) {
        if (value) {
          //get the companyList for this preferences

          addUsersToCompany($firebase(preferenceUsersRef.child(preferenceKey)).$asArray(),
                             preferenceKey, usersToAdd).then(function(usersToBeAdded) {
              preferenceListProcessed += 1;
              if (preferenceListProcessed == preferenceListCount)
                persistUsersForCompany(companyId, usersToBeAdded);

            });

        }
      })

    }

    function addUsersToCompany(companyList, preferenceKey, usersToAdd) {
      var user, deferred;
      deferred = $q.defer();

      companyList.$loaded().then(function (users) {

        //for every preference in this list, add the user id with value true
        for (var i = 0; i < users.length; i++) {
          user = users[i];

          usersToAdd[user.$id] = usersToAdd[user.$id] || {};
          usersToAdd[user.$id][preferenceKey] = true;
        }

        deferred.resolve(usersToAdd);

      });

      return deferred.promise;

    }

    function persistUsersForCompany(companyId, usersToAdd) {
      var companiesUserRef = fbutil.ref(company_users_url).child(companyId).child('users');
      companiesUserRef.set(usersToAdd);
    }

  }


})(angular);
