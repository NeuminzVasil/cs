app.controller('orderDetailsCtrl', function ( $scope, $window, $http, $sessionStorage) {

    /**
     * Показать сводную информацию о корзине
     */
    $scope.showOrder = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $sessionStorage
        if ($sessionStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
        }

        $http.get(contextPathRestaurantService + '/menu/get/'
            + JSON.parse(sessionStorage.getItem("orderDetailsJSON")).restaurantId,
            $http.user)
            .then(function (response) {
                sessionStorage.setItem("restaurantMenu1", JSON.stringify(response.data));
            })

        $scope.orderDetails = JSON.parse(sessionStorage.getItem("orderDetailsJSON"));

    };
    /**
     * Автоматически загрузить данные при старне страницы.
     */
    $scope.showOrder();

    /**
     * Оплатить заказ
     */
    $scope.payOrder = function (id) {

        let payJSON = {
            id: id,
            status: "PAID"
        }

        // меняем статус на "Оплачено"
        $http.post(contextPathOrderService + '/orders/set-status', payJSON, $http.user)
            .then(function (response) {
                $scope.restaurantsList = response.data;
                $window.location.href = '#!/user';
                alert("Заказ оплачен");
            })
            .catch(function (response) {
                alert(response.data.error);
            });

    }

    /**
     * Оплатить заказ
     */
    $scope.googlePayOrder = function (id) {

        $window.location.href = '#!/googlePayOrder';

    }

    /**
     * Получить картинку блюда по ID картинки
     * @returns {string}
     */
    $scope.getDishPicture1 = function (key) {
        if (key != null) {
            return contextPathPictureService + "/picture/menu/get/"
                + JSON.parse(sessionStorage.getItem("restaurantMenu1"))
                    .find(x => x.id === parseInt(key, 10)).pictureId
                + "?Authorization=Bearer%20"
                + $sessionStorage.currentUser.token;
        }
        return "assets/img/notFound.png";
    }

    /**
     * для завершенных заказов не показываем кнопку оплатить
     */
    $scope.isPaid = function (data) {
        return data === "PAID";
    }

});












