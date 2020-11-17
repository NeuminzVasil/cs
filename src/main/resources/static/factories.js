/// <reference path = "index.js"/>

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
        order:
            {
                customerId: null,
                restaurantId: null,
                dishes: {
                    1: {
                        id: 62,
                        price: 0.99,
                        quantity: 6
                    },
                    2: {
                        id: 63,
                        price: 1.99,
                        quantity: 3
                    }
                }
            }
    }
});





