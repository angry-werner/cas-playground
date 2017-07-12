const Twitter = require('twitter');
const PouchDB = require('pouchdb');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const uuidv1 = require('uuid/v1');

const credentials = require('./credentials.json');

const client = new Twitter(credentials.twitter);
const tone_analyzer = new ToneAnalyzerV3(credentials.toneAnalyser);
const farts = new PouchDB('farts');

const stream = client.stream('statuses/filter', {follow: '254595701'});
stream.on('data', function (event) {
    'use strict';

    function analyse(tweet) {
        'use strict';

        tone_analyzer.tone(tweet, function (err, tone) {
            if (err) {
                console.log(err);
            } else {
                var toneFromWatson = tone;
                var id = uuidv1();
                var item = {
                    '_id': id,
                    'message': event,
                    'sentiment': toneFromWatson
                }

                farts.put(item);
                farts.get(id).then(function (document) {
                    console.log(JSON.stringify(document, null, 2));
                });
            }
        });
    }
    analyse({'text': event.text});
});

stream.on('error', function (error) {
    throw error;
});

