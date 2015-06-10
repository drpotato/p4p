function EventValidator(){
  this.schema =   {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "properties": {
        "event": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string"
            },
            "location": {
              "type": "string"
            },
            "start": {
              "type": "string"
            },
            "end": {
              "type": "string"
            },
            "organiser": {
              "type": "string"
            },
            "subEvents": {
              "type": "array",
              "minItems":1,
                "items":{
                "type":"object",
                    "properties": {
              }
              }
            }
          },
          "required": [
            "title",
            "location",
            "start",
            "end",
            "organiser",
            "subEvents"
          ]
        }
      },
      "required": [
        "event"
      ]
    };
   

}

EventValidator.prototype.validate = function(json){
    var validator = require('is-my-json-valid');
    var result = validator(this.schema);
    return result(json);
};

if (module){
 module.exports = EventValidator;   
}
