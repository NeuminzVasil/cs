///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>
let orderTemp = {
    customerId: null,
    restaurantId: null,
    dishes: {}
};

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

        $scope.order = JSON.parse(sessionStorage.getItem("orderJSON"));

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

    /**
     * добавить блюдо в корзину
     * @param restaurant
     * @param dish
     */
    $scope.addDishToTempOrder = function (restaurant, dish) {

        // берем актуальное состояние корзины из sessionStorage и сохраняем во временную переменную
        orderTemp = JSON.parse(sessionStorage.getItem("orderJSON"));

        // заполняем временный шаблон заказа данными.
        orderTemp.customerId = sessionStorage.getItem("userID");
        orderTemp.restaurantId = restaurant.id;

        // добавляем dish к заказу или увеличиваем количество ранее добавленного
        if (orderTemp.dishes.hasOwnProperty(dish.id))
            orderTemp.dishes[dish.id].quantity++;
        else
            orderTemp.dishes[dish.id] = {price: dish.price, quantity: 1};

        // сохраняем данные о новом заказе в sessionStorage
        sessionStorage.setItem("orderJSON", JSON.stringify(orderTemp));


        // получаем данные о новом заказе в sessionStorage
        // orderTemp = JSON.parse(sessionStorage.getItem("orderJSON"));


        /*        orderTemp.customerId = sessionStorage.getItem("userID");
                orderTemp.restaurantId = restaurant.id;

                // setting the values
                myMap.set(dish.id, {restaurantID: restaurant.id, price: dish.price});

                // getting the values
                myMap.get(keyString);    // "value associated with 'a string'"

                $log.info(myMap);
                $log.info(orderTemp);*/

    }

    /**
     * удалить блюдо из корзины
     * @param dish
     */
    $scope.removeDishToTempOrder = function (dish) {

        orderTemp = JSON.parse(sessionStorage.getItem("orderJSON"));

        // добавляем dish к заказу или увеличиваем количество ранее добавленного
        if (orderTemp.dishes.hasOwnProperty(dish.id) && orderTemp.dishes[dish.id].quantity > 0)
            orderTemp.dishes[dish.id].quantity--;

        // сохраняем данные о новом заказе в sessionStorage
        sessionStorage.setItem("orderJSON", JSON.stringify(orderTemp));

    }

    $scope.submitOrder = function () {
        $http.post(contextPathOrderService + '/orders/add', JSON.parse(sessionStorage.getItem("orderJSON")))
            .then(function (response) {
                $log.info(response.data);

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

});












