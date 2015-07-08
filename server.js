var express = require('express');
var morgan = require('morgan');

var app = express();

var logger = morgan('combined');

app.use(logger);
app.use('/', express.static(__dirname + '/webapp'));

app.listen(process.env.PORT || 3000);
