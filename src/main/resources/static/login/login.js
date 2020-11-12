///<reference path = "https://ajax.googleapis.com/ajax/libs/angularjs/1.8.0/angular.js"/>

app.controller('loginCtrl', function ($log, $scope, $window, $http, $localStorage) {
    $scope.tryToAuth = function () {
        $http.post(contextPathUserService + '/auth', $scope.user).then(function success(response) {
            if (response.data.token) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                $log.info(response.data.token);
                $localStorage.currentUser = {username: $scope.user.username, token: response.data.token};
                $window.location.href = '#!/';
            }
        }, function error(response) {

            $log.info(response);

        });
    };

    $scope.tryToLogout = function () {
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
        $window.location.href = '#!/';
    };

    $scope.isLoggedIn = function () {
        if ($localStorage.currentUser) return true;
        return false;
    }

    $scope.getUserName = function () {
        if ($localStorage.currentUser) return $localStorage.currentUser.username;
        return null;
    }
});













