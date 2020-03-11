var http = require("http");
//加入url
var url = require("url");


//将 onRequest()方法包装起来
// onRequest() 是回调函数
function start(route, handle){
	function onRequest(request, response) {
		var postData = "";
	  	console.log("Request received.");
	  	var pathname = url.parse(request.url).pathname;
	  	console.log("Request for" + pathname + " received");
	  	//移除对postData的处理以及request.setEncoding （这部分node-formidable自身会处理）
	  	/*
	  	request.setEncoding("utf8");
	  	request.addListener("data", function(postDataChunk){
	  	postData += postDataChunk;
	  	console.log("Received POST Data chunk' " + 
	  		postDataChunk + "'.");
	  	});

	  	request.addListener("end", function(){
	  		route(handle, pathname, response, postData);
	  	});*/

	  	//使用模块 formidable
	  	route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8888);   //回调onRequest()函数
	console.log("Server has started.");
}

exports.start = start

/*
 ✘  ~/Code/node_js/node_gate  node index.js
Server has started.
#浏览器输入localhost:8888
Request received.
Request received.
*/