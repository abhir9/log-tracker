var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var request = require('request');


var globalfilepath;
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');


app.get('/', function(req, res) {
//  res.sendFile(path.join(__dirname, 'views/index.html'));

    res.render('index');
});

app.post('/upload', function(req, res) {

var globalfilepath;


    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '/uploads');
    form.on('file', function(field, file) {
		
        fs.rename(file.path, path.join(form.uploadDir, file.name));
        globalfilepath = form.uploadDir + "\\" + file.name;
			console.log("file uploading...........");
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client

    // parse the incoming request containing the form data
    form.parse(req, function(err, fields, files) {
        //	   console.log("---",req)
    });
    form.on('end', function() {
console.log("file uploaded..........");
	res.send(globalfilepath);
    });


});

app.post('/output', function(req, res) {

	req.on('data', function (globalfilepath) {
globalfilepath+="";
        console.log('GOT DATA!---'+globalfilepath);
        var splits = globalfilepath.split("#");

function getline(filename, line_no, callback) {
	
    fs.readFile(filename, function (err, data) {
      if (err)
		  console.log(err);
			
      // Data is a buffer that we need to convert to a string
      // Improvement: loop over the buffer and stop when the line is reached
      var lines = data.toString('utf-8').split("\n");

      if(+line_no > lines.length){
        return callback('File end reached without finding line', null);
      }

      callback(null, lines[+line_no]);
    });
}

getline(splits[0], splits[1], function(err, line){
	
	if(line !== undefined && line !== null)
	{
//	console.log((line !== undefined)+"---"+(typeof line !== undefined)+"---"+(line !== null)+"---"+(line !== "undefined")+"--"+
//	(null == line));
//  console.log('The line: ---------------|--'+line.length+"--|----");
  
		var result=[];
		if(line.length>2)
{	
var linesplit = line.split(" ");
var ipaddress=linesplit[9].split(":");
var request = require('request');
var countryCode,flag=0;
		
if((linesplit[3]+" "+linesplit[4]) === '"MATLAB R2013a"')
 {	 line="YES,"+line;
    flag=1;

 }
 
var usingItNow = function(callback) {
	request('http://ip-api.com/json/'+ipaddress[0], function (error, response, body) {
if (!error && response.statusCode == 200) {
var json = JSON.parse(body);
	countryCode=json["countryCode"];	
  }
  callback(countryCode);
 	});
};

 var myCallback = function(countryCode) {
  if(countryCode !== "IN" && countryCode !== undefined &&  flag!==1)
  {	line="YES,"+line;
	flag=1;
  }
  if(flag==0)
  {
	  	 line="NO,"+line;
  }
		 	result.push(line);
			res.send(result);
};	
usingItNow(myCallback);

}
else
{
			 	result.push("\n");

			res.send(result);
}	

}
else
{var result=[];
			 	result.push("end");
			res.send(result);
}
        });
		
  				});
});

var server = app.listen(process.env.PORT || 5002, function() {
    console.log('Server listening on port 5002');
});
