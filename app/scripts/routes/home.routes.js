'use strict';

angular.module(window.appName)


    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

        //use html5. Drop the #
        $locationProvider.html5Mode(true);

        // For any unmatched url, redirect to /state1
        //$urlRouterProvider.otherwise("/");


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

            .state('candidateRegister', {
                url: 'candidate_register',
                templateUrl: '../../views/candidate_register.html',
                controller: 'CandidateRegisterCtrl'
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

            .state('groups', {
                url: 'groups',
                templateUrl: '../../views/groups.html'
            })

            .state('partners', {
                url: 'partners',
                templateUrl: '../../views/partners.html'
            })

            .state('resources', {
                url: 'resources',
                templateUrl: '../../views/resources.html'
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
