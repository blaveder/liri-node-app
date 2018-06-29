console.log('Keys are loaded');
// var spotify = new spotify({ id: "3ce319795f614c0caa58924811652d00", secret: "fd893bfc3c2648978afa6628fae11c0c" });
var twitter = new twitter(keys.twitter);
var key = new omdb(key.omdb);
module.exports(twitter);
module.exports(spotify);
module.exports(omdb);

exports.twitter = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};