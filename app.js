var app = angular.module('Hotel',['ngRoute','ngCookies']);

app.config(["$routeProvider", "$locationProvider","$httpProvider", function($routeProvider, $locationProvider,$httpProvider){
    $routeProvider.
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
    }).
    when('/signUp', {
        templateUrl: 'views/signUp.html',
        controller: 'signUpController'
         }).
        when('/otp', {
            templateUrl: 'views/otp.html',
            controller: 'otpController'
        }).
        when('/forgotPassword', {
            templateUrl: 'views/forgotPassword.html',
            controller: 'forgotPasswordController'
        }).
        when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController'
        }).
        when('/whistles', {
            templateUrl: 'views/whistles.html',
            controller: 'whistlesController'
        }).
        when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'profileController'
        }).

        otherwise({
            redirectTo: '/login'
        });
    }]);

