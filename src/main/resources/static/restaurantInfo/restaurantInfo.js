///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('restaurantInfoCtrl', function ($log, $scope, $window, $http, $sessionStorage, restaurantsFactory) {

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

        $http.get(contextPathRestaurantService + '/menu/get/'+ $scope.restaurant.id, $http.user)
            .then(function (response) {
                $scope.menuList = response.data;
            });
    };
    /**
     * Автоматически загрузить данные при старне страницы.
     */
    $scope.showRestaurantInfo();

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


});












