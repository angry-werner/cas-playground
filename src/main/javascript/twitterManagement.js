const express = require('express');
const bodyParser = require('body-parser');

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
            });
        } else {
            database.find({
                selector: {
                    twitterId: {$exists: true}
                }
            }).then(function (twitterers) {
                response.send(twitterers);
            });
        }
    });
};