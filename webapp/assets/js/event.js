function EventValidator() {
  this.schema = {};
}

EventValidator.prototype.validate = function (json) {
  var validator = require('is-my-json-valid');
  var result = validator(this.schema);
  return result(json);
};

var module = module || null;

if (module) {
  module.exports = EventValidator;
}
