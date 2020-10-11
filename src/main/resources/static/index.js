///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>
let app = angular.module('cookstarter', ['ngRoute', 'ngStorage']);
const contextPath = 'http://localhost:8189/cookstarter'

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'welcome.html'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginControllerApiV1'
        })
        .when('/customer', {
            templateUrl: 'customer.html',
            controller: 'customerControllerApiV1'
        })
        .when('/customer', {
            templateUrl: 'customer.html',
            controller: 'customerControllerApiV1'
        })
        .otherwise({template: '<h1>404 Error (роутинг провайденр не нашел такой путь)</h1>'})
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'welcome/welcome.html'
        })
        .when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginControllerApiV1'
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












