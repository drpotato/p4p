function EventValidator() {
  this.schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {
        "contactDetail": {
            "type": "object",
            "oneOf":[{"$ref":"#/definitions/emailDetail"}]
        },
        "emailDetail":{
          "type":"object",
          "properties":{
            "value":{
              "type":"string",
              "pattern":"^.*$"
            }
            
          },"required":["value"]
        },
        "person": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "role": {
                    "type": "string"
                },
                "contactDetails": {
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {
                                "$ref": "#/definitions/contactDetail"
                            }
                        ]
                    }
                }
            }
        },
        "event": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                },
                "location": {
                    "type": "string"
                },
                "startTime": {
                    "type": "string"
                },
                "endTime": {
                    "type": "string"
                }
            },
            "required": [
                "title","location"
            ]
        },
        "subEvent": {
            "type": "object",
            "allOf": [
                {
                    "$ref": "#/definitions/event"
                },
                {
                    "properties": {
                        "description": {
                            "type": "string"
                        },
                        "type": {
                            "type": "string"
                        },
                        "people": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/person"
                            }
                        }
                    }
                }
            ]
        }
    },
    "title": "Conference",
    "type": "object",
    "properties": {
        "event": {
            "allOf": [
                {
                    "$ref": "#/definitions/event"
                },
                {
                    "properties": {
                        "organiser": {
                            "type": "string"
                        },
                        "subEvents": {
                            "type": "array",
                            "minItems":1,
                            "items": {
                                "$ref": "#/definitions/subEvent"
                            }
                        }
                    },"required":["subEvents","organiser"]
                }
            ]
        }
    },
    "required": [
        "event"
    ]
};


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
