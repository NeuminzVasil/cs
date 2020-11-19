///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>
let app = angular.module('cookstarter', ['ngRoute', 'ngStorage']);
const contextPath = 'http://localhost:8189/cookstarter';
const contextPathUserService = 'https://cookstarter-users-service.herokuapp.com';
const contextPathPictureService = 'https://picture-service.herokuapp.com';
const contextPathRestaurantService = 'https://cookstarter-restaurant-service.herokuapp.com';
const contextPathOrderService = 'https://cs-order-service.herokuapp.com';

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'welcome/welcome.html',
            controller: 'welcomeCtrl'
        })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        })
        .when('/registerNewUser', {
            templateUrl: 'login/registerNewUser.html',
            controller: 'loginCtrl'
        })
        .when('/registerNewRestaurant', {
            templateUrl: 'login/registerNewRestaurant.html',
            controller: 'loginCtrl'
        })
        .when('/restaurantInfo', {
            templateUrl: 'restaurantInfo/restaurantInfo.html',
            controller: 'restaurantInfoCtrl'
        })
        .when('/order', {
            templateUrl: 'orders/order.html',
            controller: 'orderCtrl'
        })
        .when('/user', {
            templateUrl: 'users/user.html',
            // controller: 'userCtrl'
        })
        .otherwise({template: '<h1>404 Error (путь не найден)</h1>'})
});













