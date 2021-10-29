// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var exec = require('child_process').exec;
var T = new Twit(require('./config.js'));
var fs = require('fs');
const { secureHeapUsed } = require('crypto');




// var today = new Date();
// var time = today.getHours();
// var r = Math.floor(Math.random() * (3 - 0) + 0);
// var tweet = " ";
var mainSearch;
const hour = new Date().getHours(); 
var r = Math.floor(Math.random() * (3 - 0) + 0);
var tweet = '';

	if (hour < 11 && hour > 0) {
		mainSearch = "Breakfast";
		// mainSearch = {q: '#Breakfast, #breakfast', count: 1, result_type: 'popular', lang: 'en'};
		// switch (r) {
		// 	case 0:
		// 		tweet = "Try this place for Breakfast today!";
		// 		break;
		// 	case 1:
		// 		tweet = "Start off your day with a great meal at this popular breakfast joint!";
		// 		break;
		// 	case 2:
		// 		tweet = "It's too early to function. Let's eat!";
		// 		break;		
		// }
	} else if (hour >= 11 && hour < 16) {
		mainSearch = "Lunch";
		// mainSearch = {q: "#Lunch, #lunch", count: 1, result_type: "popular", lang: 'en'};
		// switch (r) {
		// 	case 0:
		// 		tweet = "Hey hey! Lunchtime is here; how about some food from here?";
		// 		break;
		// 	case 1:
		// 		tweet = "Best time of the day is here! Munch on your Lunch at this popular place!";
		// 		break;
		// 	case 2:
		// 		tweet = "Mmmmm, Lunchtime! Go here to fill your tumm.";
		// 		break;		
		// }
	} else {
		mainSearch = "Dinner";
		// mainSearch = {q: '#Dinner, #dinner', count: 1, result_type: 'popular', lang: 'en'};
		// switch (r) {
		// 	case 0:
		// 		tweet = "Going out for dinner? This classy place is PERFECT for tonight!";
		// 		break;
		// 	case 1:
		// 		tweet = "Does thou wanteth some supper? Tryeth this exquisite site.";
		// 		break;
		// 	case 2:
		// 		tweet = "It's been a long day. Treat yourself to some dinner here!";
		// 		break;		
		// }
	} 

	var twetSearch = {q: mainSearch, count: 10, result_type: 'popular', lang: 'en'}; 

//This function finds the latest tweet with the mainSearch based on time of day, and retweets it.


function tweetIt() {
	// console.log(mainSearch);
	T.get('search/tweets', twetSearch, 
		function (err, data) {
			if (!err) {
				// grab ID of tweet to retweet
				  var retweetId = data.statuses[0].id_str;
				  // Tell TWITTER to retweet
				  T.post('statuses/retweet/:id', 
				  {id: retweetId}, function(err, response) {
					if (err) {
						console.log('Something went wrong while RETWEETING... Duplication maybe...');
					} 
					if (response) {
						console.log('It worked');
					}
				});
			}
			else {
				console.log('Something went wrong while SEARCHING...');
		  	}
		}
	);
}

tweetIt();

//What needs to be done
//how long the tweets
//focus US country
//quote retweet 


// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
//setInterval(tweetIt, 1000*60*60); //every hour? 4 hours?



//follow a mentioner
function followAMentioner() {
	T.get('statuses/mentions_timeline', { count:50, include_rts:1 },  function (error, reply) {
		  if (err !== null) {
			console.log('Error: ', error);
		  }
		  else {
		  	var sn = reply.pick().user.screen_name;
			if (debug) 
				console.log(sn);
			else {
				//Now follow that user
				T.post('friendships/create', {screen_name: sn }, function (error, reply) {
					if (err !== null) {
						console.log('Error: ', err);
					}
					else {
						console.log('Followed: ' + sn);
					}
				});
			}
		}
	});
}
//respond to a mention
function respondToMention() {
	T.get('statuses/mentions_timeline', { count:100, include_rts:0 },  function (err, reply) {
		  if (err !== null) {
			console.log('Error: ', err);
		  }
		  else {
		  	var mention = reply.pick();
		  	var mentionId = mention.id_str;
		  	var mentioner = '@' + mention.user.screen_name;
		  	
		  	var tweetFinal = mentioner + " " + pre.pick();
			if (debug) 
				console.log(tweetFinal);
			else
				T.post('statuses/update', {status: tweetFinal, in_reply_to_status_id: mentionId }, function(err, reply) {
					if (err !== null) {
						console.log('Error: ', err);
					}
					else {
						console.log('Tweeted: ', tweetFinal);
					}
				});
		  }
	});
}


// //setting up a user stream
// var stream = T.stream('user');
// //anytime someone follows me
// stream.on('follow', followed);
// //what to tweet when followed
// function followed(eventMsg) {
// 	var name = eventMsg.source.name;
// 	var screenName = eventMsg.source.screenName;
// 	tweetFollow('.@' + screenName + ' do you like rainbows? 🌈')
// }
// //test followed function when to tweet
// function tweetFollow(txt) {
// 	var tweet = {
// 		status: txt
// 	}
// 	T.post('statuses/update', tweet, tweeted);
// 	// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
// 	function tweeted(err, data, response) {
// 		if (err) {
// 			console.log('Something went wrong');
// 		} else {
// 			console.log('It worked');
// 		}
// 	}
	
// 	function runBot() {
// 		console.log(" "); // just for legible logs
// 		var today = new Date();
// 		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
// 		console.log(time);  // date/time of the request	
// 		// if () {
			
// 		// }
// 	}
//}


