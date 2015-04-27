'use strict';

angular.module(window.appName)



  // configure views; the authRequired parameter is used for specifying pages
  // which should only be available while logged in
  .config(['$stateProvider',  function($stateProvider) {


    //any account have to be first authenticated.
    //both users and account artboards required this authentication
    //once the are logged in.

    $stateProvider
      .state('account', {
        url: 'account',
        abstract: true,
        templateUrl: "../../views/account/index.html",
        resolve: {
          account:  ['simpleLogin', 'accountSvc', function(simpleLogin, accountSvc) {
            var loggedUser = simpleLogin.getUser();
            return accountSvc.getAccount(loggedUser.uid);
          }]
        }
      })


  }]);

