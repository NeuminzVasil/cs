///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('userCtrl', function ($log, $scope, $rootScope, $window, $http, $sessionStorage, userFactory) {

    /**
     * Показать сводную информацию о ресторане
     */
    $scope.showUserInfo = function () {
        // проверяем вошедшего пользователя (см loginController)
        // не забыть инжектнуть в контроллер параметр $sessionStorage
        if ($sessionStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
        }

        userFactory.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

        $scope.userInfo = userFactory.userInfo;
        $log.info($scope.userInfo);

/*        $http.get(contextPathOrderService
                    + '/orders/get/customer/'
                    + userFactory.userInfo.id,
                    $http.user)
            .then(function (response) {
                $scope.allUserOrders = response.data;
                $log.info($scope.allUserOrders);
            });*/
    };
    /**
     * Автоматически загрузить данные при старне страницы.
     */
    $scope.showUserInfo();

});












