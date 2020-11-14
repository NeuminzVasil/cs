///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('restaurantInfoCtrl', function ($log, $scope, $window, $http, $localStorage) {


    /**
     * Получить все список всех ресторанов
     */
    $scope.getAllRest = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $localStorage
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;

        }

        $log.info($localStorage.currentUser);

        $http.get('https://cookstarter-restaurant-service.herokuapp.com/restaurant/getAll', $http.user)
            .then(function (response) {
                $scope.restaurantsList = response.data;
                $log.info(response.data);
                // $window.location.href = '#!/';
            });
    };
    /**
     * Автоматически получать список всех ресторанов при запуске страницы.
     */
    $scope.getAllRest();

    /**
     * Получить картинку ресторана по ID (ID чего указываем, ID картинки или ресторана ?)
     * @returns {string}
     */
    $scope.getPicture = function (pictureId) {
        if (pictureId != null) {
            return "https://picture-service.herokuapp.com/picture/restaurant/get/" + pictureId + "?Authorization=Bearer%20" + $localStorage.currentUser.token;
        }
        return "assets/img/notFound.png";
    };

});












