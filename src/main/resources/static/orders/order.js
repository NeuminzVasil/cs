///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>


app.controller('orderCtrl', function ($log, $scope, $window, $http, $sessionStorage, orderFactory) {

    /**
     * Показать сводную информацию о корзине
     */
    $scope.showOrder = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $sessionStorage
        if ($sessionStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
        }

        $http.get(contextPathOrderService + '/orders/get/31', $http.user) // todo на нолевом этапе корзина формируется на стороне фронта и ID у нее нет. поэтому брать инфо нужно не из базы а из локального хранилища
            .then(function (response) {
                $scope.order = response.data;
            });

    };
    /**
     * Автоматически загрузить данные при старне страницы.
     */
    $scope.showOrder();

    /**
     * Получить картинку ресторана по ID картинки
     * @returns {string}
     */
    $scope.getPicture = function (pictureId) {
        if (pictureId != null) {
            return contextPathPictureService + "/picture/menu/get/"
                + pictureId
                + "?Authorization=Bearer%20"
                + $sessionStorage.currentUser.token;
        }
        return "assets/img/notFound.png";
    };

    $scope.addToOrder = function (restaurant, dish) {
        /*        let orderTemp = {customerId:null,
                    restaurantId:null,
                dishes: [{2 : {price: dish.price, quantity: 2}}]};*/
        let orderTemp = {
            customerId: null,
            restaurantId: null,
            dishes: []
        };
        let dishIDTemp = dish.id;
        let quantityTemp = 0;

        $log.info(sessionStorage.getItem("userID"));
        $log.info(restaurant.id);
        $log.info(dish.id);
        $log.info(dish.price);

        // заполняем временный шаблон заказа данными.
        orderTemp.customerId = sessionStorage.getItem("userID");
        orderTemp.restaurantId = restaurant.id;

        // добавляем временный диш к заказу
        orderTemp.dishes[dishIDTemp] = {price: dish.price, quantity: quantityTemp + 1};

        // сохраняем данные о новом заказе в sessionStorage
        // sessionStorage.setItem("orderJSON", JSON.stringify(orderFactory));
        // получаем данные о новом заказе в sessionStorage
        // orderTemp = JSON.parse(sessionStorage.getItem("orderJSON"));

        $log.info(orderTemp);

        /*        let indexX = invoiceFactory.invoiceJSON.purchases.findIndex((x) =>
                    x.nomenclature === nomenclature);

                if (indexX < 0) invoiceFactory.invoiceJSON.purchases.push({
                    nomenclature,
                    "count": 1,
                    "approver": null,
                    "resolvingDate": null,
                    "comment": null,
                    "buyingPrice": nomenclature.price
                });
                // добавить в JSON колличесвто + 1
                else invoiceFactory.invoiceJSON.purchases[indexX].count++;*/

    }

});












