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
      sanitizeArtGroupProfile: sanitizeArtGroupProfile,
      sanitizeCandidateProfile: sanitizeCandidateProfile,
      objectToArray: objectToArray
    };

    function objectToArray(obj) {
     var arr = [];
     _.each(_.keys(obj), function (key) {
         var oArr = obj[key];
         oArr.key = key;
         arr.push(oArr);
     });
     return arr;
    }

    function sanitizeArtGroupProfile (profile) {

      var defaults = {
        address: "",
        address_2: "",
        description: "",
        url: ""
          };

      return _.defaults(profile, defaults);
    }

      function sanitizeCandidateProfile (profile) {

          var defaults = {
              title: ""
          };

          return _.defaults(profile, defaults);
      }


    function  sanitizePreferenceList(list) {
     return  _.pick(list, function (p) {return p} );
    }

    
    }


})(angular);
