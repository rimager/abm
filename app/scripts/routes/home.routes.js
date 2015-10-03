'use strict';

angular.module(window.appName)


    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

        //use html5. Drop the #
        $locationProvider.html5Mode(false);

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");


        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../../views/main.html',
                controller: 'MainCtrl'

            })

            .state('artGroupLogin', {
                url: 'art_group_login',
                templateUrl: '../../views/art_group_login.html',
                controller: 'ArtGroupLoginCtrl'
            })

            .state('artGroupRegister', {
                url: 'art_group_register',
                templateUrl: '../../views/art_group_register.html',
                controller: 'ArtGroupRegisterCtrl'
            })

          .state('userLogin', {
            url: 'user_login',
            templateUrl: '../../views/user_login.html',
            controller: 'UserLoginCtrl'
          })

            .state('about', {
                url: 'about',
                templateUrl: '../../views/about.html'
            })

            .state('board-stories', {
                url: 'board-stories',
                templateUrl: '../../views/board-stories.html'
            })

            .state('partners', {
                url: 'partners',
                templateUrl: '../../views/partners.html'
            })

            .state('info-links', {
                url: 'info-links',
                templateUrl: '../../views/info_links.html'
            })

            .state('workshops', {
                url: 'workshops',
                templateUrl: '../../views/workshops.html'
            })

            .state('contact', {
                url: 'contact',
                templateUrl: '../../views/contact.html'
            })

            .state('terms', {
                url: 'terms',
                templateUrl: '../../views/terms.html'
            })





    }]);
