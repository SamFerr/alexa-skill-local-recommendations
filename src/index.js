
// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var languageStrings = {
    'en': {
        'translation': {
            'WELCOME' : "Welcome to Tempe City Guide!",
            'HELP'    : "Say about, to hear more about the city, or say coffee, breakfast, lunch, or dinner, to hear local restaurant suggestions, or say recommend an attraction, or say, go outside. ",
            'ABOUT'   : "Tempe is a city just east of Phoenix, in Arizona.  It's known for Arizona State University, Tempe Town Lake and Tempe Beach Park.",
            'STOP'    : "Okay, see you next time!"
        }
    }
};

var data = {
    "city"        : "Tempe",
    "state"       : "AZ",
    // "postcode"    : "85281",
    "restaurants" : [
        { "name":"RigaTony's Authentic Italian Restaurant",
            "address":"1850 E Warner Rd, Tempe, AZ 85284", "phone": "480-899-1111",
            "meals": "lunch, dinner",
            "description": "Family-friendly Italian restaurant with throwback decor & a menu featuring homestyle Italian faves."
        },
        { "name":"Four Peaks Brewing",
            "address":"1340 E 8th St, Ste 104, Tempe, AZ", "phone": "480-303-9967",
            "meals": "lunch, dinner",
            "description": "This working brewery also features a sizable eatery with patio seating & a menu of burgers & pizza."
        },
        { "name":"Crêpe Bar",
            "address":"7520 S Rural Rd, Tempe, AZ 85283", "phone": "480-247-8012",
            "meals": "lunch, dinner",
            "description": "Spare, modern cafe furnishing creative sweet & savory crêpes as well as specialty coffees & teas."
        },
        { "name":"Snooze an A.M. Eatery",
            "address":"615 S College Ave #103, Tempe, AZ 8528", "phone": "480-355-1934",
            "meals": "breakfast, coffee",
            "description": "Vibrant, retro chain serving a seasonal menu of creative breakfast & lunch fare, plus cocktails."
        },
        { "name":"Cornish Pasty Co",
            "address":"960 W University Dr #103, Tempe, AZ 85281", "phone": "480-894-6261",
            "meals": "lunch, dinner",
            "description": "Modern, minimalist bar/eatery cooking traditional & vegan Cornish pasties plus other English faves."
        },
        { "name":"The Chuckbox",
            "address":"202 E University Dr, Tempe, AZ 85281", "phone": "480-968-4712",
            "meals": "lunch, dinner",
            "description": "Basic, cash-only burger joint turning out charcoal-broiled patties plus beer & wine."
        },
        { "name":"Haji-Baba",
        "address":"1513 E Apache Blvd, Tempe, AZ 85281", "phone": "480-894-1905",
        "meals": "lunch, dinner",
        "description": "No-frills counter-serve spot serving kebabs, shawarma, gyros & more inside a Middle Eastern grocery."
        },
        { "name":"Garcia's Mexican Restaurant",
        "address":"1706 E Warner Rd, Tempe, AZ 85284", "phone": "480-838-1005",
        "meals": "lunch, dinner",
        "description": "Regional chain outpost supplying standard Mexican meals in a colorful, family-friendly setting."
        },
    ],
    "attractions":[
        {
            "name": "Desert Botanical Garden",
            "description": "The Desert Botanical Garden is a 140 acres botanical garden located in Papago Park. See all of the plant life of the desert!",
            "distance": "3"
        },
        {
            "name": "Tempe Town Lake",
            "description": "A man-made reservoir with a park and paths to allow people to walk, jog, bike, and more along its edges. The lake is also great for electric, wind, and human powered boats.",
            "distance": "0"
        },
        {
            "name": "Sea Life Arizona Aquarium",
            "description": "A 26,000 square foot aquarium containing thousands of aquatic creatures, plus interactive touch pools and a 360° ocean tunnel.",
            "distance": "5"
        },
        {
            "name": "Mill Avenue District",
            "description": "A shopping, dining, and nightlife area near Arizona State University's campus. Walk up 'A' Mountain, see a show, or spend the night out on the town, you'll never be bored on Mill Ave.",
            "distance": "0"
        }
    ]
}

// Weather courtesy of the Yahoo Weather API.
// This free API recommends no more than 2000 calls per day

var myAPI = {
    host: 'query.yahooapis.com',
    port: 443,
    path: `/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(data.city)}%2C%20${data.state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
    method: 'GET'
};
// 2. Skill Code =======================================================================================================

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        var say = this.t('WELCOME') + ' ' + this.t('HELP');
        this.emit(':ask', say, say);
    },

    'AboutIntent': function () {
        this.emit(':tell', this.t('ABOUT'));
    },

    'CoffeeIntent': function () {
        var restaurant = randomArrayElement(getRestaurantsByMeal('coffee'));
        this.attributes['restaurant'] = restaurant.name;

        var say = 'For a great coffee shop, I recommend, ' + restaurant.name + '. Would you like to hear more?';
        this.emit(':ask', say);
    },

    'BreakfastIntent': function () {
        var restaurant = randomArrayElement(getRestaurantsByMeal('breakfast'));
        this.attributes['restaurant'] = restaurant.name;

        var say = 'For breakfast, try this, ' + restaurant.name + '. Would you like more information?';
        this.emit(':ask', say);
    },

    'LunchIntent': function () {
        var restaurant = randomArrayElement(getRestaurantsByMeal('lunch'));
        this.attributes['restaurant'] = restaurant.name;

        var say = 'Lunch time! Here is a good spot. ' + restaurant.name + '. Would you like more information?';
        this.emit(':ask', say);
    },

    'DinnerIntent': function () {
        var restaurant = randomArrayElement(getRestaurantsByMeal('dinner'));
        this.attributes['restaurant'] = restaurant.name;

        var say = 'Enjoy your dinner at, ' + restaurant.name + '. Would you like more information?';
        this.emit(':ask', say);
    },

    'AMAZON.YesIntent': function () {
        var restaurantName = this.attributes['restaurant'];
        var restaurantDetails = getRestaurantByName(restaurantName);

        var say = restaurantDetails.name
            + ' is a ' + restaurantDetails.description
            + '. Their address is ' + restaurantDetails.address
            + ', and their phone number is ' + restaurantDetails.phone
            + '. I have sent these details to the Alexa App on your phone.  Enjoy your meal! <say-as interpret-as="interjection">bon appetit</say-as>' ;

        var card = restaurantDetails.name + '\n' + restaurantDetails.address
            + '\nphone: ' + restaurantDetails.phone + '\n';

        this.emit(':tellWithCard', say, restaurantDetails.name, card);

    },

    'AttractionIntent': function () {
        var distance = 200;
        if (this.event.request.intent.slots.distance.value) {
            distance = this.event.request.intent.slots.distance.value;
        }

        var attraction = randomArrayElement(getAttractionsByDistance(distance));

        var say = 'Try '
            + attraction.name + ', which is '
            + (attraction.distance == "0" ? 'right downtown. ' : attraction.distance + ' miles away. Have fun! ')
            + attraction.description;

        this.emit(':tell', say);
    },

    'GoOutIntent': function () {

        getWeather( ( localTime, currentTemp, currentCondition) => {
            // time format 10:34 PM
            // currentTemp 72
            // currentCondition, e.g.  Sunny, Breezy, Thunderstorms, Showers, Rain, Partly Cloudy, Mostly Cloudy, Mostly Sunny

            // sample API URL for Irvine, CA
            // https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22irvine%2C%20ca%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys

            this.emit(':tell', 'It is ' + localTime
                + ' and the weather in ' + data.city
                + ' is '
                + currentTemp + ' and ' + currentCondition);

            // TODO
            // Decide, based on current time and weather conditions,
            // whether to go out to a local beach or park;
            // or recommend a movie theatre; or recommend staying home


        });
    },

    'AMAZON.NoIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', this.t('HELP'));
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP'));
    }

};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function getRestaurantsByMeal(mealtype) {

    var list = [];
    for (var i = 0; i < data.restaurants.length; i++) {

        if(data.restaurants[i].meals.search(mealtype) >  -1) {
            list.push(data.restaurants[i]);
        }
    }
    return list;
}

function getRestaurantByName(restaurantName) {

    var restaurant = {};
    for (var i = 0; i < data.restaurants.length; i++) {

        if(data.restaurants[i].name == restaurantName) {
            restaurant = data.restaurants[i];
        }
    }
    return restaurant;
}

function getAttractionsByDistance(maxDistance) {

    var list = [];

    for (var i = 0; i < data.attractions.length; i++) {

        if(parseInt(data.attractions[i].distance) <= maxDistance) {
            list.push(data.attractions[i]);
        }
    }
    return list;
}

function getWeather(callback) {
    var https = require('https');


    var req = https.request(myAPI, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });
        res.on('end', () => {
            var channelObj = JSON.parse(returnData).query.results.channel;

            var localTime = channelObj.lastBuildDate.toString();
            localTime = localTime.substring(17, 25).trim();

            var currentTemp = channelObj.item.condition.temp;

            var currentCondition = channelObj.item.condition.text;

            callback(localTime, currentTemp, currentCondition);

        });

    });
    req.end();
}
function randomArrayElement(array) {
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
