app.filter('dbToRuss', function () {
    return function (date) {
        switch (date) {
            case 'SAVED':
                return "ожидает оплаты"
                break;
            case 'PAID':
                return "оплачен"
                break;
            default:
                return "не задано"
        }
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