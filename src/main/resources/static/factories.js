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
                id: 21,
                customerId: 42,
                restaurantId: 24,
                status: "SAVED",
                dateCreated: "04-10-2020 13:11:41.800+0300",
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

app.factory('userFactory', function () {
    return {
        userInfo: {
            id: null,
            firstname: null,
            lastname: null,
            email: null,
            role: null,
            restaurantId: null
        }
    }
});




