var server = require('ws').Server;
var s = new server({ port: 5000 });
console.log("Listening on port 5000...")

s.on('connection', function(ws) {
  ws.on('message', function(message) {

    //console.log("message is:       "+ message);
    message = JSON.parse(message);

    if (message.username) {
      ws.username = message.username;
      console.log("User added: " + ws.username);
    };

    //console.log("Received: " + message.content + " from " + ws.username + "(id: "+ ws._ultron.id + ")");
    s.clients.forEach(function(client){
      if(message.content) {
        if (client != ws){
          //client.send("<i>User " + ws._ultron.id + "</i>: " + message);
          console.log("Sending: " + message.content + " from " + ws.username + "(id: "+ ws._ultron.id + ")");
          client.send(JSON.stringify({
              username: ws.username,
              message: message.content,
          }));
        }
        else {
          console.log("Sending: " + message.content + " from " + ws.username + "(id: "+ ws._ultron.id + ")");
          client.send(JSON.stringify({
              username: "You",
              message: message.content,
          }));
        };
      }

    });

//    ws.send("Server sent: " + message);
  });

  ws.on('close', function(){
    console.log("User " + "x" +" disconnected");
  });

  console.log("User " + ws._ultron.id + " connected");
});
