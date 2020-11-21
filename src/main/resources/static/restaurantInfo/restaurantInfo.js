///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('restaurantInfoCtrl', function ($scope, $window, $http, $sessionStorage, restaurantsFactory) {

    /**
     * Показать сводную информацию о ресторане
     */
    $scope.showRestaurantInfo = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $sessionStorage
        if ($sessionStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
        }

        $scope.restaurant = restaurantsFactory.restaurant;

        $http.get(contextPathRestaurantService + '/menu/get/' + $scope.restaurant.id, $http.user)
            .then(function (response) {
                $scope.menuList = response.data;
            });
    };
    /**
     * Автоматически загрузить данные при старне страницы.
     */
    $scope.showRestaurantInfo();

    /**
     * Получить картинку блюда по ID картинки
     * @returns {string}
     */
    $scope.getDishPicture1 = function (pictureId) {
        if (pictureId != null) {
            return contextPathPictureService + "/picture/menu/get/"
                + pictureId
                + "?Authorization=Bearer%20"
                + $sessionStorage.currentUser.token;
        }
        return "assets/img/notFound.png";
    };

    $scope.countIdOrder = function (dish) {
        if (JSON.parse(sessionStorage.getItem("orderJSON")).dishes.hasOwnProperty(dish.id))
            return JSON.parse(sessionStorage.getItem("orderJSON")).dishes[dish.id].quantity;
        else
            return 0;

    }

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

});












