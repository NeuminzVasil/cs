///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('welcomeCtrl', function ($log, $scope, $window, $http, $localStorage, restaurantsFactory) {


    /**
     * Получить все список всех ресторанов
     */
    $scope.getAllRest = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $localStorage
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;

        }

        $http.get(contextPathRestaurantService + '/restaurant/getAll', $http.user)
            .then(function (response) {
                $scope.restaurantsList = response.data;
                // $window.location.href = '#!/';
            });
    };
    /**
     * Автоматически получать список всех ресторанов при запуске страницы.
     */
    $scope.getAllRest();

    /**
     * Получить картинку ресторана по ID картинки
     * @returns {string}
     */
    $scope.getPicture = function (pictureId) {
        if (pictureId != null) {
            return contextPathPictureService
                + "/picture/restaurant/get/"
                + pictureId
                + "?Authorization=Bearer%20"
                + $localStorage.currentUser.token;
        }
        return "assets/img/notFound.png";
    };

    /**
     * Перейти на страницу ресторана по ID ресторана
     */
    $scope.showRestaurantById = function (restaurant) {
        if (restaurant != null) {
            restaurantsFactory.restaurant = restaurant;
            $window.location.href = '#!/restaurantInfo'
        }
    };

});












