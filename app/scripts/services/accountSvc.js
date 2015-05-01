/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('accountSvc',  accountSvc);

  function accountSvc(fbutil,  $q,
                      abmEvents, broadcastSvc,
                      abmApiConfig) {


    return {
      getAccount: getAccount,
      addAccount: addAccount



    };

    //all users are added to this list for the purpse of commont attributes like
    //type: [company, customer]
    function addAccount(uid, data,  cb) {
      var ref = fbutil.ref(abmApiConfig.accounts,uid);
      ref.set(data, cb);
    }


    function getAccount(uid) {
      var deferred = $q.defer();
      var accountRef = fbutil.ref(abmApiConfig.accounts, uid);

      accountRef.once('value', function(snapshot) {
        var val = snapshot.val();
        if (val) {
          deferred.resolve(val);
        }
        else {
          broadcastSvc(abmEvents.profile.error, {message: 'account not found.'});
          deferred.reject({message: 'account not found.'});
        }
      });

      return deferred.promise;
    }


  }


})(angular);
