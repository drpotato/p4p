var express = require('express');
var morgan = require('morgan');
var VCard = require('vcards-js');

var app = express();

var logger = morgan('dev');

app.use(logger);
app.use('/app', express.static(__dirname + '/webapp/app'));
app.use('/assets', express.static(__dirname + '/webapp/assets'));
app.use('/bower_components', express.static(__dirname + '/webapp/bower_components'));


var catchAll = function (req, res) {
  res.sendFile(__dirname + '/webapp/index.html');
};

app.get('/vcard', function (req, res) {
  var vCard = VCard();
  vCard.firstName = req.query.firstName;
  vCard.lastName = req.query.lastName;
  vCard.email = decodeURIComponent(req.query.email);
  vCard.cellPhone = decodeURIComponent(req.query.cellPhone);
  vCard.workPhone = decodeURIComponent(req.query.workPhone);
  vCard.homePhone = decodeURIComponent(req.query.homePhone);

  var fileName = vCard.firstName + ' ' + vCard.lastName + '.vcf';

  // Set content-type and disposition including desired filename
  res.set('Content-Type', 'text/vcard; name="' + fileName + '"');
  res.set('Content-Disposition', 'inline; filename="' + fileName + '"');

  // Send response
  res.send(vCard.getFormattedString());
});

app.use(catchAll);

app.listen(process.env.PORT || 3000);
