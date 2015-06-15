function EventValidator() {
  this.schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {
      "contactDetail": {
        "type": "object",
        "properties": {
          "type": {"type": "string"},
          "value": {"type": "string"}
        },
      },
      "person": {
        "type": "object",
        "properties": {
          "name": {"type": "string"},
          "role": {"type": "string"},
          "contactDetails": {"type": "array", "items": {"$ref": "#/definitions/contactDetail"}}
        },
      },
      "event": {
        "type": "object",
        "properties": {
          "title": {"type": "string"},
          "location": {"type": "string"},
          "startTime": {"type": "string"},
          "endTime": {"type": "string"}
        },
      },
      "subEvent": {
        "type": "object",
        "allOf": [
          {"$ref": "#/definitions/event"},
          {
            "properties": {
              "description": {"type": "string"},
              "type": {"type": "string"},
              "people": {"type": "array", "items": {"$ref": "#/definitions/person"}}
            },
          }
        ]
      }
    },
    "title": "Conference",
    "type": "object",
    "allOf": [
      {"$ref": "#/definitions/event"},
      {
        "properties": {
          "organiser": {"type": "string"},
          "subEvents": {"type": "array", "items": {"$ref": "#/definitions/subEvent"}}
        }
      }
    ]
  }
  ;


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
