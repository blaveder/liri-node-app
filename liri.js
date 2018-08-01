require("dotenv").config();

console.log("stuffINeed");
var keys = require("./keys.js");
var request = require("request");
var Twitter = require('twitter');
var spotify = require('node-spotify-api');
var fs = require('file-system');


var spotifyApi = new spotify(keys.spotify);
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
    case "read-this":
        readText();
        break;

    default:
        console.log("liri does not understand your command");
        readText();
};
function multiWords() {
    var words = ""
    for (var i = 3; i < process.argv.length; i++) {
        // if (words == "") {
        //     words = words + process.argv[i] + " "
        // }else{
        words = words + process.argv[i] + " "
    }
    return words
}
function spotifyIt() {

    if (search == undefined) {
        search = 'nin';
    }
    console.log(search);
    spotifyApi.search({ type: 'artist', query: search, market: 'US' }, function (err, data) {
        if (!err) {
            for (i = 0; i < 4; i++)
                console.log(data.artists.items[i]);
        } else return;

    });
};

function twitter() {
    var params = {
        screen_name: search
    };
    if (params.screen_name == undefined) {
        params.screen_name = 'blank';
    }
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
    if (search == undefined) {
        search = "it";
    }

    if (typeof searchTwo !== 'undefined') {
        var combinedSearch = search + "%20" + searchTwo;
    }

    request(`http://www.omdbapi.com/?t=${combinedSearch || search}&apikey=Trilogy&plot=short`, function (error, body) {
        if (!error) {
            var newBody = JSON.parse(body.body);
            console.log(newBody.Title);
            console.log("The movie's release date is: " + newBody.Year);
            console.log("The movie's rating is: " + newBody.Rated);
            console.log("Cast Includes: " + newBody.Actors);
            console.log("Plot: " + newBody.Plot);
            console.log("Rotten Tomatoes: " + newBody.Ratings[1].Value);
            console.log("Language: " + newBody.Language);

        } else {
            console.log("ombd isn't working")
        }
    });

};
function readText() {

    fs.readFile('random.txt', 'utf8', function (err, data) {

        if (err) throw err;

        var dataArr = data.split(',');

        console.log(dataArr);


        if (dataArr[0] === "spotify-this") {
            search = dataArr[1];
            spotifyIt();

        } else {
            console.log("Invalid Command! Please try again?")
        }

    });


};
