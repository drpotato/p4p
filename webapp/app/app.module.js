'use strict';

angular.module('esad', ['esad.map', 'esad.stream', 'esad.subEvent', 'esad.openConferenceFormat', 'esad.schedule', 'esad.scheduleCreation'])

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
  $scope.timetable = [];
  $scope.validJSON = false;
  
  
  //Does JS have this method?
  var getUniqueOccurances = function(array,property){
    var propValues = [];
    array.forEach(function(item){
      if (propValues.indexOf(item[property]) === -1){
        propValues.push(item[property]);
      }
    });  
    return propValues;
  };

  
  $scope.uploadFile = function (evt) {
    var files = evt.target.files; // FileList object

    if (files.length != 1) {
      alert("Only 1 file");
    }
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      var eventJSON = JSON.parse(e.target.result);
      var result = $scope.validateFile(eventJSON);
      if (result.valid === false) {
        //Handle Error States
        $scope.event = null;
        result.errors.forEach(function (error) {
          console.error(error);
          $scope.validJSON = false;
        });
      } else {
        $scope.validJSON = true;
        $scope.event = eventJSON.event;
        $scope.generateTimetable();
      }
      $scope.$apply();
    };
    reader.readAsText(file);
  };

  //Useful for testing :v
  $scope.validateFile = function(json){
    return openConferenceFormat.validate(json);
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
  
  $scope.generateTimetable = function(){
    if (!$scope.validJSON){
      return [];
    }
    $scope.timetable = [];
    var times =  getUniqueOccurances($scope.event.subEvents,"startTime");
    times.forEach(function(time){
      var streams = $scope.getStreamsAtTime(time);
      var events = $scope.getEventsAtTime(time);
      $scope.timetable.push({
        time: time,
        streams: streams,
        events: events
      });
    });
    console.log($scope.timetable);
  };
  
  $scope.getStreamsAtTime = function(startTime){
    return getUniqueOccurances($scope.getEventsAtTime(startTime),"location");
  };
  
  $scope.getEventsAtTime = function(startTime){
    var events = [];
    $scope.event.subEvents.forEach(function(subEvent){
      if (subEvent.startTime === startTime){
        events.push(subEvent);
      }  
    });
    return events;
  };


});
