/* Import node's http module: */
var http = require("http");
var requiringRequestHandler = require("./request-handler.js");
var url = require("url");

var port = 3000;

var ip = "127.0.0.1";

var headers = requiringRequestHandler.defaultCorsHeaders;

var router = {
  "/classes/messages": requiringRequestHandler,
  "/classes/room1": requiringRequestHandler
};

var server = http.createServer(function(request, response) {
  var handler = router[url.parse(request.url).pathname];
  if (handler) {
    handler.requestHandler(request, response);
  } else {
    var statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }
});

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

// node-debug app.js
// nodemon [your node app]
