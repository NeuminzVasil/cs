app.controller('userCtrl', function ($log, $scope, $http, $sessionStorage, getRestaurantIdFactory) {

    // $scope.rId = getRestaurantIdFactory.query(2);


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
            .then(function success(response) {
                $scope.myOrders = response.data;
            });

        $http.get(contextPathRestaurantService + '/restaurant/getAll', $http.user)
            .then(function (response) {
                $scope.restaurantsList = response.data;
            });

    };

    /**
     * Автоматически загрузить данные при старне страницы.
     */
    $scope.showUserInfo();


    $scope.getR = function (rid) {
        return $scope.restaurantsList.find(x => x.id === rid).name;
    }

});












