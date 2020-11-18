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
        customerId: null,
        restaurantId: null,
        dishes: {}
    }
});





