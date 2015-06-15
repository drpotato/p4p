from jsonschema import validate
from jsonschema.exceptions import ValidationError

schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "definitions": {
    "contactDetail": {
      "type": "object",
      "properties": {
        "type": {"type": "string"},
        "value": {"type": "string"}
      },
    },
    "person" :{
      "type": "object",
      "properties": {
        "name" : {"type": "string"},
        "role": {"type": "string"},
        "contactDetails" : {"type": "array", "items": {"$ref": "#/definitions/contactDetail"}}
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
        {"properties": {
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
    {"properties": {
        "organiser": {"type": "string"},
        "subEvents": {"type": "array", "items": {"$ref": "#/definitions/subEvent"}}
      }
    }
  ]
}

sample = {
  "event": {
    "title": "Part IV Project Presentations",
    "location": "The University of Auckland",
    "start": "2012-12-13T12:12:12",
    "end": "2012-12-13T12:12:12",
    "organiser": "The University of Auckland",
    "subEvents": {
      "subEvent": {
        "title": "Event Syndication and Dissemination",
        "location": "303-UG4",
        "start": "2012-12-13T12:12:12",
        "end": "2012-12-13T12:12:12",
        "description": "Conferences and events (such as the P4P project exhibitions) publish a schedule of events. This is done in an ad-hoc fashion with no publishing standard.\nCompare this with News syndication where the RSS format governs how the News feeds are stored and transmitted. The RSS format allows News agencies to publish their article summaries in a standardized format enabling generic clients to consume the summaries, yet allowing each agency to have freedom in representing the full articles in their own form and style.\nThis project has two aspects to it. Firstly, to design and propose a standard format that encompasses the schedule requirements of conferences and events. Secondly, to develop reference client implementations (for both mobile and web) that consume and render schedules adhering to this standard format.",
        "type": "Project Presentation",
        "people": {
          "person": [
            {
              "name": "Chris Morgan",
              "role": "Contributor",
              "contactDetails": {
                "contactDetail": {
                  "type": "emailAddress",
                  "value": "cmor149@aucklanduni.ac.nz"
                }
              }
            },
            {
              "name": "Matthew Dyer",
              "role": "Contributor",
              "contactDetails": {
                "contactDetail": {
                  "type": "emailAddress",
                  "value": "mdye000@aucklanduni.ac.nz"
                }
              }
            }
          ]
        }
      }
    }
  }
}

isValid = True
try:
    validate(sample,schema)
except ValidationError as e:
    error = e
    isValid = False

if isValid:
    print "Valid Schema"
else:
    print "Invalid Schema"