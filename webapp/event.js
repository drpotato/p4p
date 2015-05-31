var eventApp = angular.module('event',[]);

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
    var env = jjv();
    

    env.addSchema('event',{
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
            console.log(reader);
        };    
    };
    
    $scope.validate = function(){
        var eventJSON = JSON.parse($scope.jsonText);
        var errors = env.validate('event',eventJSON);
        if (errors){
            //Handle Error States 
            $scope.event = null;
        }else{
            $scope.event = eventJSON.event;
            console.log($scope.event);
        }
    };
    
    
    
    
});