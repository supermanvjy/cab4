const Twit = require('twit');
require('dotenv').config();
console.log('Application started');
const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret
});

var stream = T.stream('statuses/filter', { track: "#pride"});


stream.on('tweet', function (tweet) {
  console.log(tweet);
});

