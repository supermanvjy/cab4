const express = require("express");
const router = express.Router();
const wiki = require("wikijs").default;
const Twit = require('twit');
require('dotenv').config();
var Sentiment = require('sentiment');




router.get("/summary/:title", function (req, res) {
  const { title } = req.params;

  console.log('Application started');
  const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret
  });
  var params = {

    //search for this query
    filter: 'retweets',
    filter: 'replies',
    tweet_mode: 'extended',
    q: '#'+title, 
    //number of searches
    count: 10,
    result_type: 'recent',

    lang: 'en'
    
  };

  //this will do the magic for us   
  T.get('search/tweets', params, gotData); 


  //Callback function
  function gotData(err, data, response) {

  //Tweets from other users
    var tweets = data.statuses;
    // console.log(tweets);
    var view = 0;
    console.log(tweets.length)
    // res.json(tweets);
    for (var i = 0; i<tweets.length; i++) {
      var sentiment = new Sentiment();
      console.log(tweets[i].created_at);
      // try{
      //   console.log(tweets[i].retweeted_status.full_text);
      //   tweets[i].full_text = tweets[i].retweeted_status.full_text;
      // }
      // catch{
      //   console.log("not extended");
      //   console.log(tweets[i].full_text);
      // }
        
      var analysis = sentiment.analyze(tweets[i].full_text)
    
      console.log(analysis.score);
      console.log(view);
      view += analysis.score;
      tweets[i].score = analysis.score;
      console.log("\n\n");
    } 

    console.log(view/tweets.length);
    
    res.json(tweets.map(({created_at, full_text, score}) => ({created_at, full_text, score})));
  }

  // var stream = T.stream('statuses/filter', { track: "#"+title});

  // stream.on('tweet', function (tweet) {
  //   console.log(tweet.user.name);
  //   // try{
  //   //   console.log("extended");
  //   //   console.log(tweet.retweeted_status.created_at);
  //   //   console.log(tweet.retweeted_status.extended_tweet.full_text);
  //   // }
  //   // catch{
  //   //   console.log("not extended");
  //   //   console.log(tweet.created_at);
  //   //   console.log(tweet.text);
  //   // }
  //   // console.log(tweet.text);
    
  //   res.json(tweet);
  //   console.log("\n\n");
  // });
  


  // wiki()
  //   .page(title)
  //   .then((page) => page.summary())
  //   .then((summary) => res.json({ summary }))
  //   .catch((error) => console.log(error));
});

module.exports = router;
