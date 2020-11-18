///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('userCtrl', function ($log, $scope, $http, $sessionStorage) {

    /**
     * Показать сводную информацию о пользователе
     */
    $scope.showUserInfo = function () {

        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $sessionStorage
        if ($sessionStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
        }

        // отображаем на страницу данные о пользователе
        $scope.userID = sessionStorage.getItem("userID");
        $scope.userMail = sessionStorage.getItem("userMail");
        $scope.userFirstName = sessionStorage.getItem("userFirstName");
        $scope.userLastName = sessionStorage.getItem("userLastName");
        $scope.restaurantId = sessionStorage.getItem("restaurantId");

        // получаем данные (в $scope.allUserOrders) о всех заказах пользователя.
        $http.get(contextPathOrderService + '/orders/get/customer/' + $scope.userID, $http.user)
            .then(function (response) {
                $scope.allUserOrders = response.data;
            });
    };

    /**
     * Автоматически загрузить данные при старне страницы.
     */
    $scope.showUserInfo();

    /**
     *  Получить данные по заказу
     */
    $scope.getOrderDetails = function (order) {

        // получаем данные (в $scope.allUserOrders) о всех заказах пользователя.
        $http.get(contextPathOrderService + '/orders/get/customer/' + $scope.userID, $http.user)
            .then(function (response) {
                $scope.allUserOrders = response.data;
            });
    }
});












