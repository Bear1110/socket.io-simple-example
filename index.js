var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('someoneIn'); //If you want to send a message to everyone except for a certain socket, we have the broadcast flag:
  socket.on('chat message', function(name,msg){
    message = name +" :" +msg;
    io.emit('chat message', message);

  });

  socket.on('typing', function(name,state){
    var data = {isTyping:state, person:name};
    socket.broadcast.emit('isTyping',data);
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
