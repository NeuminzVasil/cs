///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('orderCtrl', function ($log, $scope, $window, $http, $localStorage, orderFactory) {

    /**
     * Показать сводную информацию о ресторане
     */
    $scope.showOrder = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $localStorage
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

/*        $scope.order = orderFactory.order;*/

        $http.get(contextPathOrderService + '/orders/get/27', $http.user)
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
                + $localStorage.currentUser.token;
        }
        return "assets/img/notFound.png";
    };

});












