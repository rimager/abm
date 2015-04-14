/**
 * Created by io on 3/3/15.
 */

/**
 * Created by ioannissuarez on 6/20/14.
 */


(function(angular) {

  'use strict';

  angular.module('abmApp').factory('companySvc', ['fbutil',  companySvc]);

  function companySvc(fbutil) {

    var company_url = 'companies';

    return {
      updateProfile: updateProfile
    };


    function updateProfile(companyUid, data, cb) {
      var ref = fbutil.ref(company_url, companyUid);
      ref.update(data, cb);
    }

  }


})(angular);
