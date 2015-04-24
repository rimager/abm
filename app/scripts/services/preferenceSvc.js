/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('preferenceSvc', ['fbutil', '$firebaseArray', '$q', preferenceSvc]);

  function preferenceSvc(fbutil, $firebaseArray, $q) {

    var preferences_companies_url = 'preferences_companies';
    var preferences_users_url = 'preferences_users';



    return {
      addCompanyToPreferences: addCompanyToPreferences,
      addUserToPreferences: addUserToPreferences,
      matchByPreference: matchByPreference
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


    /**
     *
     * @param type (users, companies)
     * @param preferencList array or object with preference to match  {preference_1: true, preference_2: true}
     * @returns {*}
     */
    function matchByPreference(type, preferenceList) {

      var deferred = $q.defer();

      var preferenceTypeRef = fbutil.ref('preferences_' + type);
      var matches = {};
      var preferenceListCount =  getPreferenceListCount(preferenceList);
      var itemsThatMatchPreferenceKey;

      var preferenceListProcessed = 0;

      //for every preference in this list, add the user id with value true
      angular.forEach(preferenceList, function(value, preferenceKey) {

        //value: true or false
        if (value) {
            itemsThatMatchPreferenceKey = $firebaseArray(preferenceTypeRef.child(preferenceKey));
            addMatchesToList(itemsThatMatchPreferenceKey,
            preferenceKey, matches).then(function(currentMatchList) {
              preferenceListProcessed += 1;
              if (preferenceListProcessed == preferenceListCount) {
                //currentMatchList is equal to matches...
                deferred.resolve(currentMatchList);
              }

            });
        }
      });

      return deferred.promise;

    }


    function addMatchesToList(currentMatches, preferenceKey, existingMatches) {
      var item, deferred;
      deferred = $q.defer();

      currentMatches.$loaded().then(function (match) {

        //for every preference in this list, add the user id with value true
        for (var i = 0; i < match.length; i++) {
          item = match[i];

          //create a new match entry on existing matches if it does not exist
          existingMatches[item.$id] = existingMatches[item.$id] || {};

          //add the current preferenceKey as an entry for that match
          existingMatches[item.$id][preferenceKey] = true;
        }

        deferred.resolve(existingMatches);

      });

      return deferred.promise;

    }

    function getPreferenceListCount(preferenceList) {
      return angular.isArray(preferenceList)
        ? preferenceList.length
        :   Object.keys(preferenceList).length;
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
