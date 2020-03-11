var exec = require("child_process").exec;  //child_process 是一个模块
var querystring = require("querystring");
var formidable = require("formidable");
var fs = require("fs");


function start(response, postData){
	console.log("Request handler 'start' was called.");
	/*
	function sleep(milliSeconds) {
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSeconds);
	}
	
	sleep(10000);  //休眠10s
	return "hello start().";
	*/

	/*
	var content = "empty";
	 exec("find /", { timeout: 10000, maxBuffer: 20000*1024 }, 
	 	function(error, stdout, stderr) {
		response.writeHead(200, {"Content-Type": "text/plain"});
	  	response.write(stdout);
	  	response.end();
	});
	*/

	//处理post请求
	//文本 text
	/*
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
	*/

	//图片 image
    var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request){
	console.log("Request handler 'upload' was called.");
	/*
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You have sent the text: \n" + 
		querystring.parse(postData).text);

	response.end();
	*/

	//使用formidable模块
	var form = new formidable.IncomingForm();
  	console.log("about to parse");
  	form.parse(request, function(error, fields, files) {
	    console.log("parsing done");
	    fs.renameSync(files.upload.path, "/tmp/test.png");
	    response.writeHead(200, {"Content-Type": "text/html"});
	    response.write("received image:<br/>");
	    response.write("<img src='/show' />");
	    response.end();
	});
}

function show(response, postData){
	console.log("Request handler 'show' is called");
	fs.readFile("/tmp/test.png", "binary", function(error, file){
		if(error){
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		}
		else{
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;