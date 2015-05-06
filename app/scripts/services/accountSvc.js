/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('accountSvc',  accountSvc);

  function accountSvc(fbutil,  $q, abmConfig,
                       broadcastSvc
                       ) {

    var _account;


    return {
      getAccount: getAccount,
      addAccount: addAccount,
      clearAccount: clearAccount,
      isAUserAccount: isAUserAccount,
      isACompanyAccount: isACompanyAccount



    };

    function clearAccount() {
      _account = null;
    }

    function isAUserAccount(account) {
      return account.type === abmConfig.profile.type.user;
    }

    function isACompanyAccount(account) {
      return account.type === abmConfig.profile.type.company;
    }

    //all users are added to this list for the purpse of commont attributes like
    //type: [company, customer]
    function addAccount(uid, data,  cb) {
      var ref = fbutil.ref(abmConfig.api.accounts,uid);
      ref.set(data, cb);
    }


    function getAccount(uid) {
      var deferred = $q.defer();

      if (_account && _account.uid === uid)
          deferred.resolve(_account);
      else
         loadAccount(uid, deferred);

      return deferred.promise
    }


    function loadAccount(uid, deferred) {
      var accountRef = fbutil.ref(abmConfig.api.accounts, uid);

      accountRef.once('value', function(snapshot) {
        var val = snapshot.val();
        if (val) {
          _account = val;
          _account.uid = uid;
          broadcastSvc(abmConfig.events.account.loaded, {account: _account,
            isUser: isAUserAccount(_account),
               isCompany: !isACompanyAccount(_account)});
          deferred.resolve(_account);

        }
        else {
          clearAccount();
          broadcastSvc(abmConfig.events.profile.error, {message: 'account not found.'});
          deferred.reject({message: 'account not found.'});
        }
      });

    }

  }


})(angular);
