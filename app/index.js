var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var quote = require('./quote.js');

var schedule = require('node-schedule');

var j = schedule.scheduleJob('0 0 * * *', function() {
    console.log('GETTING NEW QUOTE');
    quote.set_new_quote(function() {});
});

var handle = {};
handle["/"] = requestHandlers.start;

quote.set_new_quote(function() {
    server.start(router.route, handle);
});
