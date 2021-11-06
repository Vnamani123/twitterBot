// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var exec = require('child_process').exec;
var T = new Twit(require('./config.js'));
var fs = require('fs');
const { secureHeapUsed } = require('crypto');


//day function add the specific pharse string to the original tweet text
function day() {
	let hour = new Date().getHours();
	let  r = Math.floor(Math.random() * (3 - 0) + 0);
	if (hour < 11 && hour >= 0) {
		switch (r) {
			case 0:
				return "Try this place for Breakfast today! ";
			case 1:
				return "Start off your day with a mea here! ";
			case 2:
				return "It's too early to function. Let's eat! ";
			
	}
	} else if (hour >= 11 && hour <= 17) {
		switch (r) {
			case 0:
				return "How about some food from here? ";
			case 1:
				return "Munch on your Lunch at this popular place! ";
			case 2:
				return "Mmmmm, Lunchtime! Go here to fill your tumm. ";			
		}
	} else if (hour >= 18 && hour < 22) {
		switch (r) {
			case 0:
				return "This classy place is PERFECT for tonight! ";	
			case 1:
				return "Does thou wanteth some supper? Tryeth this! ";
			case 2:
				return "Long day? Treat yourself to some dinner here!  ";
				
		}
	} else {
		return "End your day with the sweet treat! ";
	}
}

//checks the hour for each tweetIt and returns the specific hashtag
function searching() {
	let time = new Date().getHours();
	if (time < 11 && time >= 0) {
		return {q: '#Breakfast, #breakfast', count: 10, result_type: 'recent', lang: 'en'};
	} else if (time >= 11 && time <= 17) {
		return {q: '#Lunch, #lunch', count: 10, result_type: 'recent', lang: 'en'};
	} else if (time >= 18 && time <= 22) {
		return {q: '#Dinner, #dinner', count: 10, result_type: 'recent', lang: 'en'};
	} else {
		return {q: '#Dessert, #dessert', count: 10, result_type: 'recent', lang: 'en'};

	}
}

//This function finds the latest tweet returning what to search and post with unique messages
function tweetIt() {
	console.log(searching());
	T.get('search/tweets', searching(), 
		function (err, data, response) {
			if (!err) {
				// grab ID of tweet to retweet
				  var strOne = data.statuses[0].text;
				  var likeId = data.statuses[0].id_str;
				  strOne = day() + strOne;
				  console.log(strOne);
				  // Tell TWITTER to retweet
				  T.post('statuses/update', {status: strOne}, function(err,response) {
					  //likes your own tweets
					  T.post('favorites/create', {id: likeId}, function(err, response) {
					if (err) {
						console.log(err.message + 'Something went wrong while RETWEETING... Duplication maybe...');
					} 
					if (response) {
						console.log("It worked!");
					}
				});
			});
				
			}
			else {
				console.log('Something went wrong while searching...');
		  	}
		}
	);
}
setInterval(tweetIt, 1000*60*60);
tweetIt();
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60


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
				T.post('friendships/create', {screen_name: sn}, function (error, reply) {
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