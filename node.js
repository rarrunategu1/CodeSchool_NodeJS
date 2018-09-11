//NOD.JS HELLO DOG

/*var http = require('http'); //How we require modules.  This is how we include libraries in node

http.createServer(function(request, response){
    response.writeHead(200); //status code in header
    response.write("Hello, this is dog."); //response body
    response.end();
}).listen(8080); //Listen for connection on this port
console.log('Listening on port 8080...');*/

//on teriminal node node.js will run the server and return Listening on port 8080
// on termminal - curl http://localhost:808 will return hello this is dog.

//a more complex code below has two functions that work at the same time
/*var http = require('http'); 
http.createServer(function(request, response){
    response.writeHead(200);
    response.write("Dog is running. ");  
    setTimeout(function(){
        response.write("Dog is done.");
        response.end();
    }, 5000);
}).listen(8080); */

//Chat application built in browser using web application

var express = require('express'); //require exp module
var app = express(); //initialize express application.
var server = require('http').createServer(app); //create http server and have dispatch request to express
var io = require('socket.io')(server); //require socket io module and allow it use the http server to listen for requests

io.on('connection', function(client){ //listen to connection events in io
    console.log('Client connected...');
    client.emit('messages', {hello: 'world'});  //emits the messages event in our browser and sends the object hello world
    client.on('messages', function (data) {  //listens for messages
        var nickname = client.nickname;
        client.broadcast.emit("message", nickname + ": " + message); //will show what the user typed plus their username
        client.emit("message", nickname + ": " + message); //will show us what we typed back in the browser
        client.broadcast.emit("messages", data); //emits the message to everyone with broadcast
        console.log(data);
    client.on('join', function(name){ 
      client.nickname = name;  
    });

        
    });
    
});
    app.get('/', function (req, res){
        res.sendFile(__dirname + '/index.html');
    });
    server.listen(8080);

