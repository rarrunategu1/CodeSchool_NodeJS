//NOD.JS HELLO DOG

var http = require('http'); //How we require modules.  This is how we include libraries in node

http.createServer(function(request, response){
    response.writeHead(200); //status code in header
    response.write("Hello, this is dog."); //response body
    response.end();
}).listen(8080); //Listen for connection on this port
console.log('Listening on port 8080...');

//on teriminal node node.js will run the server and return Listening on port 8080
// on termminal - curl http://localhost:808 will return hello this is dog.

//a more complex code below has two functions that work at the same time
var http = require('http'); 
http.createServer(function(request, response){
    response.writeHead(200);
    response.write("Dog is running. ");  
    setTimeout(function(){
        response.write("Dog is done.");
        response.end();
    }, 5000);
}).listen(8080); 

