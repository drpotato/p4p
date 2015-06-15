var eventApp = angular.module('event', ['components']);

eventApp.directive('customOnChange', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});

eventApp.controller('EventController', function ($scope, $http) {
  //Create a validator
  var validator = require('is-my-json-valid');


  var schema = {
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
  };

  var validate = validator(schema, {
    verbose: true,
    greedy: true
  });


  $scope.uploadFile = function (evt) {
    var files = evt.target.files; // FileList object

    if (files.length != 1) {
      alert("Only 1 file");
    }
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      $scope.jsonText = e.target.result;
      $scope.$apply();
    };
    reader.readAsText(file);
  };

  $scope.validate = function () {
    var eventJSON = JSON.parse($scope.jsonText);
    validate(eventJSON);
    if (validate.errors) {
      //Handle Error States
      $scope.event = null;
      validate.errors.forEach(function (error) {
        alert(error.field + " " + error.message);
      });
    } else {
      $scope.event = eventJSON.event;
      console.log($scope.event);
    }
  };


});