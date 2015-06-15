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
    reader.readAsText(file);

    reader.onload = function (file) {
      $scope.jsonText = reader.result;
    };
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