var http = require('http');
var url = require('url');
const goodreads = require('goodreads-api-node');
let gr= goodreads({key:'dfhwnRPEi1XCgBuYc6QEjw',secret:'i84nNJpYO9DMLlMQYERhPZ5OES36AZbx0WeJQ1Ls'})
process.env.PORT=4000;

let server = http.createServer(function (request, response) {
console.log('request starting...',request.url); 
 let urlParts = url.parse(request.url, true),
        urlParams = urlParts.query, 
        urlPathname = urlParts.pathname;
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
			if(request.url.indexOf('search')>-1)
			{
				  gr.searchBooks({query:urlParams['find']})
				  .then(function(data){
					 response.writeHead(200, {'Content-Type': 'text/html'});
					 response.write(JSON.stringify(data.search));
					  response.end();
				  });	
			}
			if(request.url.indexOf('show')>-1)
			{
				  gr.showBook(urlParams['bookID'])
				  .then(function(data){
					 response.writeHead(200, {'Content-Type': 'text/html'});
					 response.write(JSON.stringify(data.book));
					  response.end();
				  });	
			}
});
server.listen(process.env.PORT);
console.log(`Server running at http://127.0.0.1:${process.env.PORT}/`);
