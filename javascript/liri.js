var fs = require("fs");
var Twitter = require ("twitter");
var Spotify = require ("node-spotify-api");
var request = require("request");
var twitterKeys = require("./keys.js").twitterKeys;
var spotify = new Spotify({
  id: "34e84d93de6a4650815e5420e0361fd3",
  secret: "5162cd8b5cf940f48702dffe096c2acb"
});

// Generally, you want to order your code in a top down fashion—like
// a newspaper— with lower-level implementation (i.e. 'fine details' 
// in our newspaper metaphor ) following higher-level abstractions (
// i.e. the 'headlines').
runThis(process.argv[2], process.argv[3]);

function runThis(argOne, argTwo) {
  liri(argOne, argTwo);
}

function liri(command, arg) {
  switch (command) {
    case "Tweets":
      getTweets();
      break;

    case "spotify-this-song":
      getSong(arg);
      break;

    case "movie-this":
      getMovieInfo(arg);
      break;

    case "do-what-it-says":
      takeCommand();
      break;

    default:
      console.log("LIRI does not know that!");
  }
}

function getTweets(){

// I know why you chose to declare your `screenName` var here
// but in general, it is better to declare all variables at the
// top of your files so devs coming in reading it for the first time
// know where to look
var screenName = "hayitsmenadine";

// I would've named this 'twitter' with a lowercase 't' rather than client
var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});

// easier to read this way
var params = {
	screen_name: 'hayitsmenadine', 
	count:20
};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
	var output = " ";
  if (error) {
    console.log("Error occured: " + error);
  } 
	tweets.forEach(function(tweet){
		console.log(" " +screenName + ": " + tweet.text);
	});
	console.log("myTweets", null, output);
  
});
}

function getSong (songName) {

	spotify.search({ type: "track", query: "The Sign" }, function(err, data) {
  	var output = " ";
  	if (err) {
    return console.log("Error occurred: " + err);
	}
	// the variable `data` is not accessible outside of the `getSong`’s 
	// function scope. You would need to move this inside it's body block
	// for the below to work
 	console.log("Song Name: " + data.tracks.items[0].name + "\n" +
 	"Artists: " + data.tracks.items[0].artists[0].name + "\n" +
 	"Album: " + data.tracks.items[0].album.name + "\n" +
 	"Preview link: " + data.tracks.items[0].preview_url + "\n");

 
});
}

function getMovieInfo(movieName) {
	
	request('http://www.omdbapi.com/?t='+movie+'&y=&plot=short&tomatoes=true&r=json&apikey=40e9cece','utf8',function(err,response,body){
		var output = " ";
		if(err) {
			return("Error occured: " +err);
		}
		
		// Better to parse once and store into a variable
		var movie = JSON.parse(body)

		console.log("Title of the movie: " + movies.Title + "\n" +
		"Release Year: " + movies.Year + "\n" +
		"IMBD Rating: "	+ movies.imbdRating + "\n" +
		"Rotten Tomatoes Rating: " + movies.tomatoRating + "\n" +
		"Country of Production: " + movies.Country + "\n" +
		"Language: " + movies.Language + "\n" +
		"Plot:  " + movies.Plot + "\n" +
		"Actors: " + movies.Actors + "\n");
	});
}

function takeCommand() {
	// looks good 👍
	fs.readFile("./random.txt", "utf8", function(err, data){
		if (err) throw err;
		consle.log(data);

		var array = data.split(",");
		
		if (array.length === 2) {
			liri(array[0], array[1]);
		}
		else if (array.length === 1){
			liri(data[0]);
		}
	});
};
