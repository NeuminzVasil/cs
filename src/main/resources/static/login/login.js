///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('loginCtrl', function ($log, $scope, $rootScope, $window, $http, $sessionStorage, userFactory) {

    /**
     * получить токен по логину и паролю
     */
    $scope.tryToAuth = function () {
        $http.post(contextPathUserService + '/auth', $scope.user).then(function success(response) {
            if (response.data.token) {

                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                $sessionStorage.currentUser = {username: $scope.user.username, token: response.data.token};

                userFactory.userInfo.id = response.data.userId;
                userFactory.userInfo.restaurantId = response.data.restaurantId;

                sessionStorage.setItem("userInfo", JSON.stringify(userFactory.userInfo));

                $log.info(sessionStorage.getItem("userInfo"));

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
        delete $sessionStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
        $window.location.href = '#!/';
    };

    /**
     * проверка признака аутентификации
     * @returns {boolean}
     */
    $scope.isLoggedIn = function () {
        if ($sessionStorage.currentUser) return true;
        return false;
    }

    /**
     * Получить имя пользователя
     * @returns {null|$scope.user.username}
     */
    $scope.getUserName = function () {
        if ($sessionStorage.currentUser) return $sessionStorage.currentUser.username;
        return null;
    }

    /**
     * Регистрация нового клиента
     */
    $scope.registerNewUser = function () {
        userFactory.userInfo = $scope.userInfo;
        sessionStorage.setItem("userInfo", userFactory.userInfo);
        $log.info(userFactory.userInfo);
/*        $http.post(contextPathUserService + '/reg', userFactory.userInfo)
            .then(function success(response) {
                $window.location.href = '#!/';

            }, function error(response) {
                $log.info(response);
            });*/
    };

    /**
     * Регистрация нового менеджера ресторана
     */
    $scope.registerNewRestaurant = function () {

        $http.post(contextPathRestaurantService + '/restaurant/add', $scope.restaurantJSON)
            .then(function success(response) {
                $scope.managerJSON.id = response; // todo получить id ресторана
            }, function error(response) {
                $log.info(response);
            });

        $scope.managerJSON.role = "RESTAURANT_ADMIN";
        $http.post(contextPathUserService + '/reg/restaurant', $scope.managerJSON)
            .then(function success(response) {
                $window.location.href = '#!/';
            }, function error(response) {
                $log.info(response);
            });
    };
});












