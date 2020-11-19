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
        order: {
            id: 35,
            customerId: 3,
            restaurantId: 2,
            status: null,
            dateCreated: null,
            dishes: {
                76: {
                    id: 56,
                    price: 67.55,
                    quantity: 3
                },
                77: {
                    id: 57,
                    price: 88.99,
                    quantity: 4
                },
                78: {
                    id: 58,
                    price: 120.50,
                    quantity: 2
                }
            }
        }
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




