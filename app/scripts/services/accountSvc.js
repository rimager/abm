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
      watchAccount: watchAccount,
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


    function watchAccount(uid, type, cb) {
      var accountRef = fbutil.ref(type ,uid);
      accountRef.on('value', function(snapshot) {
        var val = snapshot.val();
        if (val)
          cb(val);
      });

    }

    function loadAccount(uid, deferred) {

     //try company
     tryLoadAccount(uid, 'companies', deferred)
    }

    function tryLoadAccount(uid, type, deferred) {
      
      var accountRef = fbutil.ref(type ,uid);
      accountRef.once('value', function(snapshot) {
        var val = snapshot.val();
        if (val) 
          proccessAccount(val, uid,deferred);
         else if (type != 'users') tryLoadAccount(uid, 'users', deferred);
        
      });
    }

    function proccessAccount(account,uid,  deferred) {
    
          _account = account;
          _account.uid = uid;
         deferred.resolve(_account);
    }

  }


})(angular);
