app.filter('isEmpty', function () {
    return function (date) {
        if (date == null) return "не задано";
        else return date;
    }
});


app.factory('restaurantsFactory', function () {
    return {
        restaurant: {
            id: null,
            name: null,
            description: null,
            picture: null
        }
    }
});

app.factory('orderFactory', function () {
    return {
        customerId: null,
        restaurantId: null,
        dishes: {}
    }
});


app.factory('getRestaurantIdFactory', function ($log, $http, $sessionStorage) {

    return {

        query: function (restaurantID) {

            if ($sessionStorage.currentUser) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
            }

            $log.info("restaurantID" + restaurantID);
            $http.get(contextPathRestaurantService
                + '/restaurant/get/'
                + restaurantID,
                $http.user)
                .then(function (response) {
                    $log.info(response.data.name);
                    return response.data.name;
                });

        }
    };

});




