var http = require("http");
var url = require("url");
var quote = require('./quote.js');

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        quote.get_quote(function(returned_quote) {
            route(handle, pathname, response, returned_quote);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;