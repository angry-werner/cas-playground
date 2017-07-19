# Readme or not, Playground for my CAS work
This is a repository holding a toy implementation of the pol|i|t|ycs CAS projects backend. The current state of affairs is:
* The twitter push API is implemented and listening for tweets from me
* The IBM Watson sentiment analyser is implemented
* The result is stored in a CouchDB database
* There is a possibility to add and remove twitter ids to the database

This is just implemented as I went along. Error handling, modularisation etc. were not thought of. Testing was attempted but I found out I had to take a decision, before I could start.

Node is v8.1.4 and linting is done for ES6.

Obviously there is a lot more to do:
* Using the twitter ids set in the database to configure the push API
* Write tests
* Push this through a CI and deploy it somewhere
* Generally cleanup the implementation
* Proper modularisation
* Proper error handling
* Consolidation of used asynchronous patterns
* Use proper Express routing (didn't work for me)
* Proper interface to be consumed from the GUI
* Use data wrapper in the responses of exposed the API

Gotchas
* To install on Windows (or anywhere else), you need the C++ Toolchain installed (leveldown DB backend for the CouchDB)
* You need the credentials for the twitter and the IBM APIs, I do not check in those
* The twitter API uses a numerical id to follow

APIs
* Add a twitter id: post {"twitterId": 1} in the body at http://localhost:3000/twitterers
* Get or delete the configured twitter ids: get or delete http://localhost:3000/twitterers
* Get or delete an entry with the given twitter id: get or delete http://localhost:3000/twitterers&key=theTwitterId
Some request examples for postman are checked in as Twitter App.postman_collection.json.