/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module(window.appName).factory('profileHelperSvc', [ profileHelperSvc]);

  function profileHelperSvc() {


    return {
      sanitizePreferenceList: sanitizePreferenceList,
      sanitizeArtGroupProfile: sanitizeArtGroupProfile
    };

    function sanitizeArtGroupProfile (profile) {

      var defaults = {
        address: "",
        address_2: "",
        description: "",
        url: ""
      }

      return _.defaults(profile, defaults);
    }
    function  sanitizePreferenceList(list) {
     return  _.pick(list, function (p) {return p} );
    }

    
    }


})(angular);
