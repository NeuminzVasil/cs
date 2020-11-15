///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('restaurantInfoCtrl', function ($log, $scope, $window, $http, $localStorage, restaurantsFactory) {

    /**
     * Показать сводную информацию о ресторане
     */
    $scope.showRestaurantInfo = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $localStorage
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;

        }

        $scope.restaurant = restaurantsFactory.restaurant;

        $http.get('https://cookstarter-restaurant-service.herokuapp.com/menu/get/'+ $scope.restaurant.id, $http.user)
            .then(function (response) {
                $scope.menuList = response.data;
                $log.info($scope.menuList);
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
            return contextPathPictureService + "/picture/menu/get/" + pictureId + "?Authorization=Bearer%20" + $localStorage.currentUser.token;
        }
        return "assets/img/notFound.png";
    };


});












