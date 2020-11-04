const Twit = require('twit');
const Twitter = new Twit(require('./config.js'));
const {performance} = require('perf_hooks');
var OAuth = require('oauth');
const { consumer_key,
		consumer_secret,
		access_token,
		access_token_secret } = require('./config.js');


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

function main(){
	var min = 1;
	var max = 100;
	bogoSort(min,max);
	//sendTweet(bogoSort(min,max));
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

function bogoSort(min = 1,max = 10){
	var output = "";
	var data = [];
	for(var i = min; i <= max; i++) {
		data.push(i);
	}

	shuffle(data);
	output += ("INPUT: [ "+data+" ]\n");

	var counter = 0;
	var start = performance.now();
	while(!isSorted(data)){
		shuffle(data);
		counter++;
	}
	var end = performance.now();
	var time = end - start;
	output += ("BogoSort Bot sorted the list in:\n");
	output += (counter.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" tries and "+time.toFixed(3)+" ms!\n");
	output += ("SORTED: "+data);
	console.log(output);
	console.log();
	return output;
}

main()
