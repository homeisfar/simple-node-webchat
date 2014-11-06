var express = require ("express");
var app = express ();
var port = 3700;

app.set ('views', __dirname + '/tpl');
app.set ('view engine', "jade");
app.engine ('jade', require ('jade').__express);
app.get ("/", function (req, res)
  {
    res.render ("page");
  });

app.use (express.static (__dirname + '/public'));
var io = require ('socket.io').listen (app.listen (port));

io.sockets.on ('connection', function (socket)
{
  var user_addr = socket.handshake.address;
  console.log ("New user has connected from " + user_addr.address);
  socket.emit ('message', {message: 'This is the unofficial cs439 in-class chat.' });
  socket.on ('send', function (data)
  {
    io.sockets.emit ('message', data);
  });
});
console.log ("Listening on port " + port);
