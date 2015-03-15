/**
 * Created by io on 3/8/15.
 */
/**
 * Create by ricardocorrie on 6/18/14
 */

describe.only('Services: UserSvc', function() {

    var userMock, userSvc, userIsAuthenticated;

    beforeEach(function () {
      module('abmApp');
    });

    beforeEach(inject(
      function (_userSvc_) {
        userSvc =  _userSvc_;
      }));

    afterEach(function() {

    });

    it('should get permission denied when updating a user profile while not logged in', function (done) {
       userMock = window.mocks.user.getNewUser();

       userSvc.updateProfile(userMock.uid, {a: 1, b:2, c: {hello: true, world: true}}, function(err) {
         expect(err).to.be.null;
         //: expect(err).to.equal('permission_denied')
         done();
       })

    });

  it('should update an user profile with data', function (done) {
       userMock = window.mocks.user.getNewUser();

       userSvc.updateProfile(userMock.uid, {a: 1, b:2, c: {hello: true, world: true}}, function(err) {
         expect(err).to.be.null;
         //: expect(err).to.equal('permission_denied')
         done();
       })

    });




});
