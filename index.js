var server = require("./simple_http_server");
var router = require("./router");
var requestHandlers = require("./request_hanlder");


var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show

server.start(router.route, handle);

