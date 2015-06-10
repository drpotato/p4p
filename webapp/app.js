var eventApp = angular.module('event',['components']);

eventApp.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});

eventApp.controller('EventController',function($scope){
   //Create a validator
    var validator = require('is-my-json-valid');
    

    var schema = {
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
          "items": {
            "type": "object",
            "properties": {}
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
    
    var debugSchema = {
  "event": {
    "title": "Part IV Project Presentations",
    "location": "The University of Auckland",
    "start": "2012-12-13T12:12:12",
    "end": "2012-12-13T12:12:12",
    "organiser": "The University of Auckland",
    "subEvents": [
      {
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
                  "value": "mdye175@aucklanduni.ac.nz"
                }
              }
            }
          ]
        }
      }
    ]
  }
};
    
    
    $scope.event = debugSchema.event;
    
    var validate = validator(schema, {
      verbose: true,
      greedy: true
    });

    
    
    $scope.uploadFile = function(evt) {
        var files = evt.target.files; // FileList object

        if (files.length != 1){
            alert("Only 1 file");   
        }
        var file = files[0];
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function(file){
            $scope.jsonText = reader.result;
        };    
    };
    
    $scope.validate = function(){
        return;
        var eventJSON = JSON.parse($scope.jsonText);
        validate(eventJSON);
        if (validate.errors){
            //Handle Error States 
            $scope.event = null;
            validate.errors.forEach(function(error){
               alert(error.field + " " + error.message);
            });
        }else{
            $scope.event = eventJSON.event;
            console.log($scope.event);
        }
    };
    
    
    
    
    
    
});