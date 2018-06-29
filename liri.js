require("dotenv").config();

console.log("stuffINeed");
var keys = require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var spotify = require('node-spotify-api');


var spotifyApi = new spotify({ id: "3ce319795f614c0caa58924811652d00", secret: "fd893bfc3c2648978afa6628fae11c0c" });
var twitterApi = new Twitter(keys.twitter);



var argumentOne = process.argv[2];
var search = process.argv[3];



switch (argumentOne) {
    case "spotify-this":
        spotifyIt();
        break;

    case "tweet-this":
        twitter();
        break;

    case "omdb-movie":
        movie();
        break;

    default:
        console.log("liri does not understand your command");
};

function spotifyIt() {

    spotifyApi.search({ type: 'artist', query: search, market: 'US' }, function (err, data) {
        if (!err) {
            console.log(data);
        } else return;

    });
};

function twitter() {
    var params = {
        screen_name: search
    };

    twitterApi.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            for (var i = 0; i < tweets.length; i++) {
                console.log('========================================');
                console.log(tweets[i].user.name);
                console.log(tweets[i].text);
                console.log("url: ", tweets[i].user.url);
            }
        }
    });

}

function movie() {

    request(`http://www.omdbapi.com/?t=${search}&apikey=Trilogy&plot=short`, function (error, response, body) {
        if (!error) {
            var newBody = JSON.parse(body);
            console.log(newBody.Title);
            console.log("The movie's release date is: " + newBody.Year);
            console.log("The movie's rating is: " + newBody.Rated);
            console.log("Cast Includes: " + newBody.Actors);
            console.log("Plot: " + newBody.Plot);
            console.log("Rotten Tomatoes: " + newBody.Ratings[1].Value);
            console.log("Language: " + newBody.Language);
        }
    });
}