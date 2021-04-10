const Twit = require('twit');
const Twitter = new Twit(require('./config.js'));
const {performance} = require('perf_hooks');
var OAuth = require('oauth');
const { consumer_key,
		consumer_secret,
		access_token,
		access_token_secret } = require('./config.js');

function main(){
	//	Argument Handling!
	try{
		if (process.argv.length >= 2) {
			//	If user supplies 1 or more arguments (run "node . these are args")
			data = [];
			var i = 2;
			while (process.argv[i]){
				data.push(process.argv[i]);
				i++;
			}
		}
	} catch {
		// If for some reason the user gets an error
		console.log("Uh oh... there was an error (/).(\\)");
		process.exit();
	}

	bogoSort(data); // BogoSort without tweeting (Good for Debugging)
	//sendTweet(bogoSort(data)); // BogoSort and tweet!
}

// Fisher-Yates Shuffle as found at https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function isSorted(array){
	//Returns True if Sorted
	for(var i = 0; i < array.length - 1; i++){
		if(array[i] > array[i+1]){
			return false;
		}
	}
	return true;
}

function sendTweet(status_text){
	Twitter.post(
		'statuses/update',
		{status:status_text},
		function(err, data, res) {
			if (err) {
				console.log(err);
			} else {
				// console.log(data);
			}
		}
	); 
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10)/1000; // don't forget the second param
	var days 	= Math.floor(sec_num / (3600*24))
	var hours   = Math.floor((sec_num - days) / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (days 	< 10) {days		= "0"+days;}
    if (hours   < 10) {hours	= "0"+hours;}
    if (minutes < 10) {minutes 	= "0"+minutes;}
    if (seconds < 10) {seconds 	= "0"+seconds;}
    return days + 'd:' + hours + 'h:' + minutes + 'm:' + seconds + 's';
}

function bogoSort(data){
	// If no data supplied to bogoSort
	if(data.length == 0){
		const quantity = 10;
		console.log("No data given, generating {",quantity,"} item array...");
		data = Array.from(Array(quantity).keys());
		data = shuffle(data);
	}

	// If a string, turn into array
	if(typeof data === 'string' || data instanceof String){
		data = data.split('');
	}

	// Initiate the Tweet Text
	var output = "";
	output += ("INPUT: "+data.join(' ')+"\n");
	timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
	console.log("[",timestamp,"]",output);

	// Let the Bogo Sort Commence!
	var counter = 0;
	var start = performance.now();
	while(!isSorted(data)){
		shuffle(data);
		counter++;
	}
	var end = performance.now();
	var time = end - start;

	// Append the statistics to the Tweet!
	output += ("Bogo Sort Bot sorted the list in:\n");
	//output += (counter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" tries and "+time.toFixed(3)+" ms!\n");
	output += (counter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" shuffles and \n"+time.toString().toHHMMSS()+"\n");
	output += ("SORTED: "+data.join(' '));
	console.log("-------Tweet:-------\n"+output+"\n--------------------");
	return output;
}

main();
