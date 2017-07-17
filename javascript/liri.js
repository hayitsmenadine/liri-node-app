var fs = require("fs");
var twitter = require ("twitter");
var spotify = require ("node-spotify-api");
var request = require("request");
var twitterKeys = require("./keys.js").twitterKeys;


function getTweets(){

var screenName = "hayitsmenadine";
var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});
 
var params = {screen_name: 'hayitsmenadine', count:20};
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
 	console.log("Song Name: " + data.tracks.items[0].name + "\n" +
 	"Artists: " + data.tracks.items[0].artists[0].name + "\n" +
 	"Album: " + data.tracks.items[0].album.name + "\n" +
 	"Preview link: " + data.tracks.items[0].preview_url + "\n");

 
});
}

function getMovieInfo(movieName) {

	var movie;

	request('http://www.omdbapi.com/?t='+movie+'&y=&plot=short&tomatoes=true&r=json','utf8',function(err,response,body){
		var output = " ";
		if(err) {
			return("Error occured: " +err);
		}

		console.log("Title of the movie: " + JSON.parse(body).Title + "\n" +
		"Release Year: " + JSON.parse(body).Year + "\n" +
		"IMBD Rating: "	+ JSON.parse(body).imbdRating + "\n" +
		"Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\n" +
		"Country of Production: " + JSON.parse(body).Country + "\n" +
		"Language: " + JSON.parse(body).Language + "\n" +
		"Plot:  " + JSON.parse(body).Plot + "\n" +
		"Actors: " + JSON.parse(body).Actors + "\n");
	};
}

function takeCommand() {

	fs.readFile("./random.txt", "utf8", function(err, data){
		if (err) throw err;

		var array = data.split(",");
		var command = array[0];
		var arg = array[1];

		liri(command, arg);
	});
}

function liri(command, arg){

	switch(command){
		
		case "Tweets":
		getTweets();
		break;

		case "Spotify"
		


	}
}
