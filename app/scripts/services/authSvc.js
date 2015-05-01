/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('authSvc',  authSvc);

  function authSvc($q, abmConfig,
                      abmEvents,
                      profileSvc, simpleLogin,  broadcastSvc
                      ) {


    return {
      authorizeProfile: authorizeProfile,
      authorizeUser: authorizeUser,
      authorizeCompany: authorizeCompany

    };


    //type: [company, customer]
    function authorizeProfile(profileType, account) {
      var deferred = $q.defer();
      var loggedUser = simpleLogin.getUser();

      if (account.type !== profileType) {
        rejectAuth(deferred);
      }
      else {
        profileSvc.getProfile(profileSvc.getProfilesUrl(profileType),
          loggedUser.uid)
          .then(function (user) {
            angular.extend(user, loggedUser);
            deferred.resolve(user);
          }, function (reason) {
            rejectAuth(deferred);
          }
        )
      }
      return deferred.promise;
    }


    function authorizeCompany(account) {
      return authorizeProfile(abmConfig.profile.type.company, account);
    }

    function authorizeUser(account) {
      return authorizeProfile(abmConfig.profile.type.user, account);
    }

    function rejectAuth(deferred) {
      broadcastSvc(abmEvents.profile.error, {message: 'invalid account.'});
      deferred.reject(abmConfig.events.profile.error);
    }

  }
})(angular);
