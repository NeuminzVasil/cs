///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('loginCtrl', function ($log, $scope, $window, $http, $localStorage) {

    /**
     * получить токен по логину и паролю
     */
    $scope.tryToAuth = function () {
        $http.post(contextPathUserService + '/auth', $scope.user).then(function success(response) {
            if (response.data.token) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                $log.info(response.data.token);
                $localStorage.currentUser = {username: $scope.user.username, token: response.data.token};
                $window.location.href = '#!/';
            }
        }, function error(response) {

            $log.info(response);

        });
    };

    /**
     * выход из системы
     */
    $scope.tryToLogout = function () {
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
        $window.location.href = '#!/';
    };

    /**
     * проверка признака аутентификации
     * @returns {boolean}
     */
    $scope.isLoggedIn = function () {
        if ($localStorage.currentUser) return true;
        return false;
    }

    /**
     * Получить имя пользователя
     * @returns {null|$scope.user.username}
     */
    $scope.getUserName = function () {
        if ($localStorage.currentUser) return $localStorage.currentUser.username;
        return null;
    }

    /**
     * Регистрация нового клиента
     */
    $scope.registerNewUser = function () {
        $http.post(contextPathUserService + '/reg/customer', $scope.userJSON)
            .then(function success(response) {
                $log.info($scope.userJSON);
                $window.location.href = '#!/';
                $log.info(response);

            }, function error(response) {
                $log.info(response);
            });
    };

    /**
     * Регистрация нового менеджера ресторана
     */
    $scope.registerNewRestaurant = function () {

        $http.post(contextPathRestaurantService + '/restaurant/add', $scope.restaurantJSON)
            .then(function success(response) {
                $log.info($scope.restaurantJSON);
                $log.info(response);
                $scope.managerJSON.id = response; // todo получить id ресторана
            }, function error(response) {
                $log.info(response);
            });

        $scope.managerJSON.role = "RESTAURANT_ADMIN";
        $http.post(contextPathUserService + '/reg/restaurant', $scope.managerJSON)
            .then(function success(response) {
                $log.info($scope.managerJSON);
                $window.location.href = '#!/';
                $log.info(response);

            }, function error(response) {
                $log.info(response);
            });
    };
});












