const Twitter = require('twitter');
const PouchDB = require('pouchdb');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const uuidv1 = require('uuid/v1');
const Rx = require('rxjs');

const TwitterManagement = require('./twitterManagement.js');
const credentials = require('./../../../credentials.json');

const client = new Twitter(credentials.twitter);
const tone_analyzer = new ToneAnalyzerV3(credentials.toneAnalyser);
PouchDB.plugin(require('pouchdb-find'));
const farts = new PouchDB('farts');
farts.createIndex({
    index: {
        fields: ['twitterId']
    }
});

TwitterManagement.initTwitterManagement(farts, uuidv1);


const observer = Rx.Subscriber.create(
    function (tweet) {
        'use strict';
        analyse(tweet);
    },
    function (error) {
        'use strict';
        console.log(error);
    },
    function () {
        'use strict';
        console.log('Twitter channel closed');
    });

const stream = Rx.Observable.fromEvent(client.stream('statuses/filter', {follow: '254595701'}), 'data');
stream.subscribe(observer);

function analyse(tweet) {
    'use strict';

    tone_analyzer.tone({'text': tweet.text}, function (err, tone) {
        if (err) {
            console.log(err);
        } else {
            var toneFromWatson = tone;
            var id = uuidv1();
            var item = {
                '_id': id,
                'message': tweet,
                'sentiment': toneFromWatson
            };

            farts.put(item);
            farts.get(id).then(function (document) {
                console.log(JSON.stringify(document, null, 2));
            });
        }
    });
}
