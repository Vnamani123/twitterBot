// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

<<<<<<< Updated upstream
// This is the URL of a search for the latest tweets on the '#mediaarts' hashtag.
var foodSearch = {q: "#brunch", count: 10, result_type: "recent"};

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function retweetLatest() {
	T.get('search/tweets', {q: "#brunch", count: 10}, function (err, data, res) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
		var retweetId = data.statuses[0].id_str;
		// ...and then we tell Twitter we want to retweet it!
		T.post('statuses/retweet/' + retweetId, { }, function (error, response) {
			if (response) {
				console.log('Success! Check your bot, it should have retweeted something.')
=======



// var today = new Date();
// var time = today.getHours();
// var r = Math.floor(Math.random() * (3 - 0) + 0);
// var tweet = " ";
var twetSearch;
const hour = new Date().getHours(); 
var r = Math.floor(Math.random() * (3 - 0) + 0);
function day() {
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
				return "Lunchie muchies! How about some food from here? ";
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
				return "Long day? Treat yourself to some dinner here! ";
				
		}
	} else {
		return "End your day with the sweet treat! ";
	}
}

if (hour < 11 && hour >= 0) {
	twetSearch = {q: '#Breakfast, #breakfast', count: 10, result_type: 'recent', lang: 'en'};
} else if (hour >= 11 && hour <= 17) {
	twetSearch = {q: '#Lunch, #lunch', count: 10, result_type: 'recent', lang: 'en'};
} else if (hour >= 18 && hour <= 22) {
	twetSearch = {q: '#Dinner, #dinner', count: 10, result_type: 'recent', lang: 'en'};
} else {
	twetSearch = {q: '#Dessert, #dessert', count: 10, result_type: 'recent', lang: 'en'};

}

//This function finds the latest tweet with the mainSearch based on time of day, and retweets it.

//1. takes a string in paramater (strOne), line 80
//2. call function in strOne
//3. tweetSearch before get
//4. build the replace message + adds meassge into a new function
//5. javascript string methods, to splice
function tweetIt() {
	console.log(twetSearch);
	T.get('search/tweets', twetSearch, 
		function (err, data, response) {
			if (!err) {
				// grab ID of tweet to retweet
				  var retweetId = data.statuses[0].id_str;
				  var strOne = data.statuses[0].text;
				  strOne = day() + strOne;
				  console.log(strOne);
				  // Tell TWITTER to retweet
				  T.post('statuses/update', {status: strOne}, function(err,response) {
					if (err) {
						console.log(err.message + 'Something went wrong while RETWEETING... Duplication maybe...');
					} 
					if (response) {
						console.log('It worked');
					}
				});
>>>>>>> Stashed changes
			}
			// If there was an error with our Twitter call, we print it out here.
			if (error) {
				console.log('There was an error with Twitter:', error);
			}
		})
	  }
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

// Try to retweet something as soon as we run the program...
retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 60 * 60);
