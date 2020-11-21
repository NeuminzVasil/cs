///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('loginCtrl', function ( $scope, $rootScope, $window, $http, $sessionStorage, $route) {

    /**
     * получить токен по логину и паролю
     */
    $scope.tryToAuth = function () {
        $http.post(contextPathUserService + '/auth', $scope.user)
            .then(function (response) {
                if (response.data.token) {

                    // запрашиваем токен пользователя
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $sessionStorage.currentUser = {username: $scope.user.username, token: response.data.token};

                    // сохраняем id пользователя в фабрику
                    sessionStorage.setItem("userID", response.data.userId);

                    // сохраняем привязку id ресторана в фабрику
                    sessionStorage.setItem("restaurantId", response.data.restaurantId);

                    // внедряем персональные данные о пользователе в sessionStorage
                    $scope.injectUserInfo();

                    // Инициализация пустой корзины при входе
                    $scope.orderInitialize()

                    // переходим на главную страницу
                    $window.location.href = '#!/';
                }
            })
            .catch(function (response) {
                alert(response);
            });
    };

    /**
     * выход из системы
     */
    $scope.tryToLogout = function () {
        // отчистка sessionStorage при выходе
        $scope.sessionStorageCleaning();
        $http.defaults.headers.common.Authorization = '';
        $window.location.href = '#';
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
     * Получить Login пользователя
     * @returns {null|$scope.user.username}
     */
    $scope.getUserLogin = function () {
        if ($sessionStorage.currentUser) return $sessionStorage.currentUser.username;
        return null;
    }

    /**
     * Получить информацию о пользователе
     * @returns {null|$scope.user.username}
     */
    $scope.injectUserInfo = function () {

        if ($sessionStorage.currentUser) {
            // запрашиваем информацию о пользователе
            $http.get(contextPathUserService + '/users/info/'
                + sessionStorage.getItem("userID"),
                $http.user)
                .then(function (response) {
                    // сохраняем информацию о пользователе в фабрику
                    sessionStorage.setItem("userFirstName", response.data.firstName);
                    sessionStorage.setItem("userLastName", response.data.lastName);
                    sessionStorage.setItem("userMail", response.data.email);
                    sessionStorage.setItem("userInfo", JSON.stringify(response.data));
                });
        }
        return JSON.parse(sessionStorage.getItem("userInfo"));
    }

    /**
     * Регистрация нового клиента
     */
    $scope.registerNewUser = function () {

        sessionStorage.setItem("userInfo", JSON.stringify($scope.userInfo));

        $http.post(contextPathUserService + '/reg', JSON.parse(sessionStorage.getItem("userInfo")))
            .then(function success(response) {
                $window.location.href = '#!/';

            }).catch(function (response) {
            alert(response);
        });

    };

    /**
     * Регистрация нового менеджера ресторана
     */
    $scope.registerNewRestaurant = function () {

        let restaurantInfoTemp = {
            name: $scope.managerInfo.restaurantName,
            description: $scope.managerInfo.description
        };

        $http.post(contextPathRestaurantService + '/restaurant/add', restaurantInfoTemp)
            .then(function success(response) {

                let managerInfoTemp = {
                    userId: sessionStorage.getItem("userID"),
                    restaurantId: response.data,
                    roleName: "RESTAURANT_MANAGER"
                };

                $http.post(contextPathUserService + '/update', managerInfoTemp)
                    .then(function success(response) {
                        $window.location.href = '#!/';
                    })
                    .catch(function (response) {
                    alert(response);
                });

            }).catch(function (response) {
            alert(response);
        });


    };

    /**
     * Инициализация пустой корзины при входе
     */
    $scope.orderInitialize = function () {
        sessionStorage.setItem("orderJSON", JSON.stringify({
            customerId: null,
            restaurantId: null,
            dishes: {}
        }));
    }

    /**
     * отчистка sessionStorage при выходе
     */
    $scope.sessionStorageCleaning = function () {
        sessionStorage.clear();
    }
});












