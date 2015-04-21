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
      setPreferences: setPreferences,
      getProfiles: getProfiles


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

    /**
     *
     * @param type: String ('users', 'companies')
     * @param itemKeys {key_1: true, key_2: true}
     * @returns array {list of profiles objects}
     */
    function getProfiles(type, itemKeys) {

      var deferred = $q.defer();

      var itemTypeRef = fbutil.ref(type);
      var matches = {};
      var itemKeysCount =  getPreferenceListCount(itemKeys);
      var itemsThatMatchPreferenceKey;

      var itemKeysProcessed = 0;

      //for every preference in this list, add the user id with value true
      angular.forEach(itemKeys, function(value, preferenceKey) {

        //value: true or false
        if (value) {
          itemsThatMatchPreferenceKey = $firebase(itemTypeRef.child(preferenceKey)).$asArray();
          addMatchesToList(itemsThatMatchPreferenceKey,
            preferenceKey, matches).then(function(currentMatchList) {
              itemKeysProcessed += 1;
              if (itemKeysProcessed == itemKeysCount) {
                //currentMatchList is equal to matches...
                deferred.resolve(currentMatchList);
              }

            });
        }
      });

      return deferred.promise;

    }


    function getProfile(items) {
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

  }


})(angular);
