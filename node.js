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
var message = []; //store messages in array
var redisClient = redis.createClient();

var storeMessage = function(name, data){
    var message = JSON.stringify({name: name, data: data}); //stringify turns the object into a string to store in reddit
    redisClient.lpush("messages", message, function(err, response) {
        redisClient.ltrim("messages", 0, 9) //which will always keep the newest 10 message there.
    })
   
    }
    io.sockets.on('connection', function(client){ //listen to connection events in io
    client.on('messages', function (message){
        client.get("nickname", function(error, name) {
           client.broadcast.emit("messages", name + ": " + message); //emits the message to everyone with broadcast
         client.emit("message", name + ": " + message); //will show us what we typed back in the browser
        storeMessage(name, message);
        client.on('join', function(name){
            client.broadcast.emit("add chatter", name); //notifies other clients who joined
            redisClient.smemember('names', function(err, names) {
               names.forEach(function(name){
                   client.emit('add chatter', name);
               });
            });
                rediClient.sadd("chatters", name);
            redisClient.lrange("messages", 0, -1, function(err, message){
                messages = messages.reverse(); //reversed so that they're emitted in the correct order
            })
         messages.forEac(function(message){
             message = JSON.parse(message); //parse into JSON object
             client.emit("messages", message.name + ": " + message.data);
         })   //iterate through messages array and emits a message on the connecting cient for each one
            client.on('disconnect', function (name){
                client.get('nickname', function(err, name){
                    clientbroadcast.emit("remove chatter", name);
                    redisClient.srem("chatters", name);
                });
            });
    


        
    });
    
});
    app.get('/', function (req, res){
        res.sendFile(__dirname + '/index.html');
    });
    server.listen(8080);

