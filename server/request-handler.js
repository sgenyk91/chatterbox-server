var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var messages = [];

var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  var data = {results: messages};


  if (request.method === "GET") {
    response.writeHead(statusCode, headers);
    console.log(JSON.stringify(data));
    response.end(JSON.stringify(data));
  } else if (request.method === "POST") {
    statusCode = 201;
    var body = "";
    request.on("data", function(data) {
      body += data;
    });
    request.on("end", function() {
      var parseBody = JSON.parse(body);
      messages.unshift(parseBody);
    });
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data));
  } else if (request.method === "OPTIONS") {
    response.writeHead(statusCode, headers);
    response.end();
  }


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
};


exports.requestHandler = requestHandler;
exports.defaultCorsHeaders = defaultCorsHeaders;

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

