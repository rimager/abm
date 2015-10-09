/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('listingSvc', ['fbutil', '$q', '$firebaseObject', listingSvc]);

  function listingSvc(fbutil, $q,  $firebaseObject) {


    return {
      getList: getList,
      getUsers: getUsers,
      getCompanies: getCompanies,
      getPreferences: getPreferences,
      getCandidatesForCompany: getCandidatesForCompany,
      getCompaniesForCandidate: getCompaniesForCandidate
 
    };

    function getCandidatesForCompany(uid,  cb) {
       getFullProfiles(uid, 'matches_for_companies', 'candidates', cb);
     }
     
    function getCompaniesForCandidate(uid,  cb) {
       getFullProfiles(uid, 'matches_for_candidates', 'companies', cb);
     }
    function getFullProfiles(uid, matches_url, profilesUrl, cb ) {

      fbutil.ref(matches_url).child(uid).once('value', function(matches) {
         getFullProfile(matches.val(), profilesUrl,  cb);
      })
    }

    function getFullProfile(profiles, profileUrl, cb) {
    
      var profileKeys= _.keys(profiles);
      if ( profileKeys.length > 0) {
         //get the list asynch
        var ref = fbutil.ref(profileUrl);
        _.each( profileKeys, function(profileKey) {
           ref.child(profileKey).once('value', function(profile) { cb(profile.key(),  profile.val()) } );
        });
      }
    }


    function getUsers(keys) {
      return getList('users', keys);
    }


    function getCompanies(profiles, cb) {
      return getFullProfile(profiles, 'companies', cb);
    }

    function getPreferences(keys, child_pref) {
      child_pref = child_pref ? "/" + child_pref : "";
      return getList('filters' + child_pref, keys);
    }


    /**
     *
     * @param type: String ('users', 'companies')
     * @param itemKeys {key_1: true, key_2: true}
     * @returns array {list of profiles objects}
     */
    function getList(url, itemKeys) {

      var deferred = $q.defer();

      var itemTypeRef = fbutil.ref(url);
      var matches = [];
      var itemKeysCount =  getKeysCount(itemKeys);
      var itemsThatMatchItemKey;

      var itemKeysProcessed = 0;

      //for every preference in this list, add the user id with value true
      angular.forEach(itemKeys, function(value, itemKey) {

        //value: true or false
        if (value) {
          $firebaseObject(itemTypeRef.child(itemKey)).$loaded(function(item) {
            matches.push(item);

            itemKeysProcessed += 1;
            if (itemKeysProcessed == itemKeysCount) {
              //currentMatchList is equal to matches...
              deferred.resolve(matches);
            }

          });

        }
      });

      return deferred.promise;

    }


    function getKeysCount(keys) {
      return angular.isArray(keys)
        ? keys.length
        :   Object.keys(keys).length;
    }



  }


})(angular);
