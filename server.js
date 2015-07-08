var express = require('express');
var morgan = require('morgan');

var app = express();

var logger = morgan('dev');

app.use(logger);
app.use('/app', express.static(__dirname + '/webapp/app'));
app.use('/assets', express.static(__dirname + '/webapp/assets'));
app.use('/bower_components', express.static(__dirname + '/webapp/bower_components'));


var catchAll = function (req, res) {
  res.sendFile(__dirname + '/webapp/index.html');
};

app.use(catchAll);
app.get('/', catchAll);

app.listen(process.env.PORT || 3000);
