
if (typeof schema === "undefined") {
  var schema = require("../schema/schema.ocf.js");
}


function EventValidator() {
  this.schema = schema;gi
}

EventValidator.prototype.validate = function (json) {
  var validator = require('is-my-json-valid');
  var result = validator(this.schema);
  return result(json);
};



if (typeof module !== "undefined") {
  module.exports = EventValidator;
}
