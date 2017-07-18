var fs = require("fs");
var Twitter = require ("twitter");
var Spotify = require ("node-spotify-api");
var request = require("request");
var twitterKeys = require("./keys.js").twitterKeys;
var spotify = new Spotify({
  id: "34e84d93de6a4650815e5420e0361fd3",
  secret: "5162cd8b5cf940f48702dffe096c2acb"
});


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

	request('http://www.omdbapi.com/?t='+movie+'&y=&plot=short&tomatoes=true&r=json&apikey=40e9cece','utf8',function(err,response,body){
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
	});
}

function takeCommand() {

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

function liri(command, arg){

	switch(command){
		
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
};

function runThis(argOne, argTwo) {
	liri(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
