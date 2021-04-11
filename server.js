const Twit = require('twit');
const Twitter = new Twit(require('./config.js'));
const {performance} = require('perf_hooks');
var OAuth = require('oauth');
const { consumer_key,
		consumer_secret,
		access_token,
		access_token_secret } = require('./config.js');
var bsb = require('./bogosort.js');

function main(){

  // Thanks to @mmryspace and @JHS in this stackoverflow post: https://stackoverflow.com/questions/37346041/how-to-respond-to-mentions-using-twitter-api
  // Trigger this when someone mentions @bogosortbot
  var stream = Twitter.stream('statuses/filter', { track: ['@bogosortbot'] });
  stream.on('tweet', tweetEvent);

}

function tweetEvent(tweet) {
    // Who sent the tweet?
    var name = tweet.user.screen_name;
    if (name === 'bogosortbot'){return 0;}
    // What is the text?
    var txt = tweet.text;
    var txt = txt.replace(/@bogosortbot /g, "");

    // the status update or tweet ID in which we will reply
    var nameID  = tweet.id_str;

    // Start a reply back to the sender
    console.log(txt);
    txt = txt.split(' ');
    var reply = '@'+name+'\n'+bsb.bogoSort(txt);
    var params = {
                  status: reply,
                  in_reply_to_status_id: nameID
    };
    Twitter.post('statuses/update', params, function(err, data, response) {
      if (err !== undefined) {
        console.log(err);
      } else {
        console.log('Tweeted:\n' + params.status);
      }
    });
}

main();