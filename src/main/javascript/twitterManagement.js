const express = require('express');
const bodyParser = require('body-parser');
const R = require('ramda');

const twitterManagement = express();
twitterManagement.use(bodyParser.json());

exports.initTwitterManagement = function (database, uuidv1) {

    twitterManagement.listen(3000, function () {
        console.log('TwitterManagement up at port 3000!');
    });

    // Request body {"twitterId": 1}
    twitterManagement.post('/twitterers', function (request, response) {
        let twitterer = {
            _id: uuidv1(),
            twitterId: request.body.twitterId
        };
        database.put(twitterer);
        response.send(twitterer);
    });
    // ?key=
    twitterManagement.get('/twitterers', function (request, response) {
        let key = request.query.key;
        if (key !== undefined && key !== null && key !== '') {
            database.get(key).then(function (twitterer) {
                response.send(twitterer);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(404);
            });
        } else {
            database.find({
                selector: {
                    twitterId: {$exists: true}
                }
            }).then(function (twitterers) {
                response.send(twitterers);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(404);
            });
        }
    });
    twitterManagement.delete('/twitterers', function (request, response) {
        let key = request.query.key;
        if (key !== undefined && key !== null && key !== '') {
            database.get(key).then(function (twitterer) {
                deleteTwitterers([twitterer], response);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(404);
            });
        } else {
            database.find({
                selector: {
                    twitterId: {$exists: true}
                }
            }).then(function (twitterers) {
                deleteTwitterers(twitterers.docs, response);
            }).catch(function (error) {
                console.log(error);
                response.sendStatus(404);
            });
        }
    });

    function deleteTwitterers(twitterers, response) {
        R.map(x => x._deleted = true, twitterers);
        database.bulkDocs(twitterers).then(function () {
            response.send();
        }).catch(function (error) {
            console.log('Not deleted: ' + error);
            response.sendStatus(500);
        });
    }
};