/// <reference path = "index.js"/>
const contextPathUserService = 'https://cookstarter-users-service.herokuapp.com'

app.controller('loginControllerApiV1', function ($log, $scope, $window, $http, $localStorage) {
    $scope.tryToAuth = function () {
        $http.post(contextPathUserService + '/auth', $scope.user)
            .then(function (response) {
                if (response.data.token) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $log.info("birer:" , response.data.token);
                    $localStorage.currentUser = {username: $scope.user.username, token: response.data.token};
                    $window.location.href = '#!/';
                }
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













