/**
 * Created by io on 3/8/15.
 */
/**
 * Create by ricardocorrie on 6/18/14
 */

describe.only('Services: userCompaniesSvc', function() {

    var userMock, userCompaniesSvc;

    beforeEach(function () {
      module('abmApp');
    });

    beforeEach(inject(
      function (_$rootScope_, _userCompaniesSvc_  ) {
        userCompaniesSvc =  _userCompaniesSvc_;
      }));


    it('should add companies to user', function (done) {


      userMock = window.mocks.user.getNewUser();

      var prefList = {
        "artgrouptype_film": true,
        "artgrouptype_literaty": true,
        "artgrouptype_media": true,
        "artgrouptype_museum_dace": true,
        "artgrouptype_museum_visual_art": true,
        "artgrouptype_music": true
      };

       userCompaniesSvc.addCompaniesByPreferencesToUser(userMock.uid, prefList);
       done();

    });



});
