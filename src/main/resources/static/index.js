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
            templateUrl: 'welcome.html',
            controller: 'welcomeCtrl'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginCtrl'
        })
        .when('/registerNewUser', {
            templateUrl: 'login/registerNewUser.html',
            controller: 'loginCtrl'
        })
        .otherwise({template: '<h1>404 Error (путь не найден)</h1>'})
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'welcome/welcome.html'
        })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        })
        .otherwise({template: '<h1>404 Error (роутинг провайденр не нашел такой путь)</h1>'})
});

app.controller('categoryControllerApiV1', function ($scope, $http, $localStorage) {
    // проверяем вошедшего пользователя (см loginController)
    // не забыть инжектнуть в контроллер параметр $localStorage
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }
    let Category = function () {

        $http.get(contextPath + "/api/v1/category")
            .then(function (response) {
                $scope.categoryList = response.data;
            });
    };
    Category();
});

app.controller('customerControllerApiV1', function ($scope, $http, $routeParams, invoiceFactory, $localStorage) {
    // проверяем вошедшего пользователя (см loginController)
    // не забыть инжектнуть в контроллер параметр $localStorage
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    $scope.customer = function () {
        $http.get(contextPath + "/api/v1/customer")
            .then(function (response) {
                $scope.customerList = response.data;
            });
    };
    $scope.customer();

});

app.factory('myFactory', function () {
    return {
        invoiceJSON:
            {
                dataCreate: new Date(),
                orderNumber: null,
                comment: null,
                totalPrice: null,
                customer: {id: null},
                purchases: []
            }
    }
});












