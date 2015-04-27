/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('profileSvc',  profileSvc);

  function profileSvc(fbutil,  $firebaseObject, $q,
                      wrapPromiseSvc, abmEvents, broadcastSvc, abmApiConfig) {


    return {
      addProfile: addProfile,
      updateProfile: updateProfile,
      getPreferences: getPreferences,
      setPreferences: setPreferences,
      getProfiles: getProfiles,
      getProfile: getProfile
    };

    //all users are added to this list for the purpse of commont attributes like
    //type: [company, customer]
    function addProfile(uid, data,  cb) {
      var ref = fbutil.ref('profiles');
      var profile = [];
      profile[uid] = data;
      ref.set(profile, cb);
    }

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


    function getProfile(type, uid) {
      var deferred = $q.defer();
      var profileRef = fbutil.ref(type, uid);

      profileRef.once('value', function(snapshot) {
        var val = snapshot.val();
        if (val) {
          deferred.resolve(val);
        }
        else {
          broadcastSvc(abmEvents.profile.error, {message: 'profile not found.'});
          deferred.reject({message: 'profile not found.'});
        }
      });

      return deferred.promise;
    }

  }


})(angular);
