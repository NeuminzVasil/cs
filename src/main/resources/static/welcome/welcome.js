///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.factory('restaurantsFactory', function () {
        return {
            restaurantsJSON:
                {
                    dataCreate: new Date(),
                    orderNumber: null,
                    department: null,
                    comment: null,
                    invoiceNumber: null,
                    totalPrice: null,
                    sentToPrice: false,
                    sentToApprove: false,
                    sentToPurchase: false,
                    resolveDate: null,
                    customer: {id: null},
                    purchases: []
                }
        }
    });

app.controller('welcomeCtrl', function ($log, $scope, $window, $http, $localStorage) {

    // $scope.restaurantsJSON = restaurantsJSON;

    $scope.getAllRest = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $localStorage
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;

        }

        $log.info($localStorage.currentUser);

        $http.get('https://cookstarter-restaurant-service.herokuapp.com/restaurant/getAll', $http.user)
            .then(function (response) {
                $scope.restaurantsList = response.data;
                    $log.info(response.data);
                    // $window.location.href = '#!/';
            });
    };


    $scope.getAllRest ();

    app.controller('welcomeCtrl', function ($log, $scope, $window, $http, $localStorage) {

        // $scope.restaurantsJSON = restaurantsJSON;

        $scope.getAllRest = function () {
            // проверяем вошедшего пользователя (см loginController)
            // не забыть инжектнуть в контроллер параметр $localStorage
            if ($localStorage.currentUser) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;

            }

            $log.info($localStorage.currentUser);

            $http.get('https://cookstarter-restaurant-service.herokuapp.com/restaurant/getAll', $http.user)
                .then(function (response) {
                    $scope.restaurantsList = response.data;
                    $log.info(response.data);
                    // $window.location.href = '#!/';
                });
            $scope.getPicture()
        };

        $scope.getAllRest ();

        $scope.getPicture = function () {

            $log.info("getPicture()");

            $http.get('https://picture-service.herokuapp.com/picture/restaurant/get/1?Authorization=Bearer%20eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjM0NTAwMDcwLCJpYXQiOjE2MDI5NjQwNzB9.1HLjqDbZz5VN6B268zQA5CVCQ0maYmyaWcY6YOMoMow')
                .then(function (response) {
                    $scope.images = response.img
                    $log.info($scope.images);
                });
        };

    });


});












