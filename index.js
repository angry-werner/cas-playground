const Twitter = require('twitter');
const PouchDB = require('pouchdb');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const uuidv1 = require('uuid/v1');

const credentials = require('./credentials.json');

var client = new Twitter(credentials.twitter);

var stream = client.stream('statuses/filter', {follow: '254595701'});
stream.on('data', function(event) {
    console.log(event && event.text);
});

stream.on('error', function(error) {
    throw error;
});

var text = 'Greetings from Watson Developer Cloud!';
console.log('To be analysed: ' + text);

var tone_analyzer = new ToneAnalyzerV3(credentials.toneAnalyser);

tone_analyzer.tone({ text: text},
    function(err, tone) {
        if (err)
            console.log(err);
        else
            console.log(JSON.stringify(tone, null, 2));
    });

var farts = new PouchDB('farts');
farts.info().then(function (info) {
    console.log(info);
})

console.log('UUID: ' + uuidv1());

