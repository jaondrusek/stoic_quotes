var fs = require('fs');
var path = require('path');

function error_page(response) {
    response.writeHead(500, {"Content-Type": "text/html"});
    response.write("Page not found.");
    response.end();
}

function start(response) {
    console.log("Request handler 'start' was called.");

    fs.readFile(__dirname + "/html/quote_main.html", 'utf-8', function(err, data) {
        if (err) {
            console.log(err);
            error_page(response);
        } else {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        }
    });
}

exports.start = start;
