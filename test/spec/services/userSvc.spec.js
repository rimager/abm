/**
 * Created by io on 3/8/15.
 */
/**
 * Create by ricardocorrie on 6/18/14
 */

describe('Services: UserSvc', function() {

    var userMock, userSvc, simpleLogin, $rootScope, fbutil, ref;

    beforeEach(function () {
      module('abmApp');
    });

    beforeEach(inject(
      function (_$rootScope_, _userSvc_, _simpleLogin_, _fbutil_) {
        $rootScope = _$rootScope_;
        userSvc =  _userSvc_;
        simpleLogin = _simpleLogin_;
        fbutil = _fbutil_;
        ref = fbutil.ref();
      }));

    beforeEach(function (done) {
      //login the user in
      var promise =  simpleLogin.passwordLogin({email: 'testUser@ioa.io', password: '12345'}, {rememberMe: true});
      promise.then(function() {
          done();
        },
        function (err) {
          done(err);
        }


      );
      ref.flush();
      $rootScope.$apply();
    });

    afterEach(function() {
      simpleLogin.logout();
    });

    it('should get permission denied when updating a user profile while not logged in', function (done) {

      //logout the user first
      simpleLogin.logout();

      userMock = window.mocks.user.getNewUser();

       userSvc.updateProfile(userMock.uid, {a: 1, b:2, c: {hello: true, world: true}}, function(err) {
         expect(err).not.to.be.null;
         //: expect(err).to.equal('permission_denied')
         done();
       })

    });

  it('should update an user profile with data', function (done) {
       var userTest = simpleLogin.getUser();

       userSvc.updateProfile(userTest.uid, {a: 1, b:2, c: {hello: true, world: true}}, function(err) {
         expect(err).to.be.null;
         done();
       })

    });




});
