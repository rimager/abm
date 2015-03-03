/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('userSvc', ['fbutil', '$q', userSvc]);

  function userSvc(fbutil, $q) {

    var user_url = 'preferences_users';

    return {
      updateProfile: updateProfile
    };


    function updateProfile(user, data) {

      var deferred = $q.defer();

      var ref = fbutil.ref('users', user.uid);
      ref.update(data, function(err) {
        if (err)
            deferred.reject(err);
        else
          deferred.resolve({user: user, data: data});
      });

      return deferred.promise;
    }

  }


})(angular);
