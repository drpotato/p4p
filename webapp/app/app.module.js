'use strict';

angular.module('esad', ['esad.map', 'esad.stream', 'esad.subEvent', 'esad.openConferenceFormat', 'esad.scheduleCreation'])

.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(true)
}])

.directive('customOnChange', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
})

.controller('EventController', function ($scope, $http, openConferenceFormat) {
  $scope.streams = [];
  $scope.event = {};
  
  $scope.uploadFile = function (evt) {
    var files = evt.target.files; // FileList object

    if (files.length != 1) {
      alert("Only 1 file");
    }
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var eventJSON = JSON.parse(e.target.result);
      var result = openConferenceFormat.validate(eventJSON);
      if (result.errors) {
        //Handle Error States
        $scope.event = null;
        result.errors.forEach(function (error) {
          console.error(error);
        });
      } else {
        $scope.event = eventJSON.event;
        $scope.streams = openConferenceFormat.getStreams(eventJSON);
      }
      $scope.$apply();
    };
    reader.readAsText(file);
  };

  $scope.makeICS = function(){
    //TODO: maybe this can be an angular module so we don't have to declare it in the html as well?
    var cal = ics();
    $scope.event.subEvents.forEach(function(subEvent){
      console.log(subEvent);
      cal.addEvent(subEvent.title,subEvent.title,subEvent.location,subEvent.startTime, subEvent.endTime);
    });
    cal.download();
  };


});
