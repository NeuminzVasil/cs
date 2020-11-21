let orderTemp = {
    customerId: null,
    restaurantId: null,
    dishes: {}
};

app.controller('orderCtrl', function ( $scope, $window, $http, $sessionStorage) {

    /**
     * Показать сводную информацию о корзине
     */
    $scope.showOrder = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $sessionStorage
        if ($sessionStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
        }

        // получить меню ресторана чтобы добыть picuteId
        $http.get(contextPathRestaurantService + '/menu/get/'
            + JSON.parse(sessionStorage.getItem("orderJSON")).restaurantId,
            $http.user)
            .then(function (response) {
                sessionStorage.setItem("restaurantMenu", JSON.stringify(response.data));
            })

        $scope.order = JSON.parse(sessionStorage.getItem("orderJSON"));

    };
    /**
     * Автоматически загрузить данные при старне страницы.
     */
    $scope.showOrder();

    /**
     * подтвердить заказ
     */
    $scope.submitOrder = function () {
        $http.post(contextPathOrderService + '/orders/add', JSON.parse(sessionStorage.getItem("orderJSON")))
            .then(function (response) {

                alert("Заказ сформирован и ожидает оплаты. Мы перенаправим Вас на страницу Ваших заказов");

                // в случае удачно переданного заказа в сторону бекэда нужно отчистить текущий заказ
                orderTemp = {
                    customerId: null,
                    restaurantId: null,
                    dishes: {}
                };
                sessionStorage.setItem("orderJSON", JSON.stringify(orderTemp));

                $window.location.href = '#!/user';

            })
            .catch(function (response) {
                alert(response);
            });
    }

     /**
     * Получить картинку блюда по ID картинки
     * @returns {string}
     */
    $scope.getDishPicture = function (key) {

        if (key != null) {
            return contextPathPictureService + "/picture/menu/get/"
                + JSON.parse(sessionStorage.getItem("restaurantMenu"))
                    .find(x => x.id === parseInt(key, 10)).pictureId
                + "?Authorization=Bearer%20"
                + $sessionStorage.currentUser.token;
        }
        return "assets/img/notFound.png";
    }


});












