# Readme or not, Playground for my CAS work
This is a repository holding a toy implementation of the pol|i|t|ycs CAS projects backend. The current state of affairs is:
* The twitter push API is implemented and listening for tweets from me
* The IBM Watson sentiment analyser is implemented
* The result is stored in CouchDB
* There is a possibility to add and remove twitter ids to the database

Obviously there is a lot more to do:
* Using the twitter ids set in the database to configure the push API
* Write tests
* Push this through a CI and deploy it somewhere
* Generally cleanup the implementation
* Proper error handling
* Consolidation of used asynchronous patterns
* Use proper Express routing (didn't work for me)
* Proper interface to be consumed from the GUI

Gotchas
* To install on Windows (or anywhere else), you need the C++ Toolchain installed (leveldown DB backend for the CouchDB)
* You need the credentials for the twitter and the IBM APIs, I do not check in those
* The twitter API uses a numerical id to follow

APIs
* Add a twitter ID: post {"twitterId": 1} in the body at http://localhost:3000/twitterers
* Get the configured twitter ids: get http://localhost:3000/twitterers
* Get or Delete an entry with the given twitter id: get or delete http://localhost:3000/twitterers&key=theTwitterId