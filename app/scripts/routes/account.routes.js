'use strict';

angular.module(window.appName)



  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$stateProvider',  function($stateProvider) {


    //any account have to be first authenticated.
    //both users and account artboards required this authentication
    //once the are logged in.

    $stateProvider
      .state('artGroup', {
        url: 'art_group',
        abstract: true,
        templateUrl: "../../views/art_groups/index.html",
        resolve: {
          account:  ['simpleLogin', 'profileSvc', function(simpleLogin, profileSvc) {
            var loggedUser = simpleLogin.getUser();
            return profileSvc.getAccount(loggedUser.uid);
          }]
        }
      })


  }]);
