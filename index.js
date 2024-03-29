var express = require ("express");
var app = express ();
var port = 3700;
var users = 0;

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

  users++;
  console.log ("New user has connected. Total: " + users);

  socket.emit ('message', {message: 'This is the unofficial cs439 in-class chat.' });

  socket.on ('send', function (data)
  {
    io.sockets.emit ('message', data);
  });

  socket.on ('disconnect', function ()
  {
    users--;
    console.log ('user disconnected. Total: ' + users);
  });

});


console.log ("Listening on port " + port);
