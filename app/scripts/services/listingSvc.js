/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('listingSvc', ['fbutil', '$firebaseObject', 'wrapPromiseSvc', listingSvc]);

  function listingSvc(fbutil,  $firebaseObject, wrapPromiseSvc) {


    return {
      getList: getList,
      getUsers: getUsers,
      getCompanies: getCompanies,
    };


    function getUsers(keys) {
      return getList('users', keys);
    }

    function getCompanies(keys) {
      return getList('companies', keys);
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
      var matches = {};
      var itemKeysCount =  getKeysCount(itemKeys);
      var itemsThatMatchItemKey;

      var itemKeysProcessed = 0;

      //for every preference in this list, add the user id with value true
      angular.forEach(itemKeys, function(value, itemKey) {

        //value: true or false
        if (value) {
          itemsThatMatchItemKey = $firebase(itemTypeRef.child(itemKey)).$asObject();
          addItemsToList(itemsThatMatchItemKey,  matches).then(function(currentMatchList) {
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

    function addItemsToList(currentMatches,  existingMatches) {
      var item, deferred;
      deferred = $q.defer();

      currentMatches.$loaded().then(function (match) {

        //for every preference in this list, add the user id with value true
        for (var i = 0; i < match.length; i++) {
          item = match[i];

          //create a new match entry on existing matches if it does not exist
          existingMatches.push[item];

        }

        deferred.resolve(existingMatches);

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
