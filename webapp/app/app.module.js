'use strict';

angular.module('esad', ['esad.fileUpload','esad.map', 'esad.stream', 'esad.subEvent', 'esad.openConferenceFormat', 'esad.schedule', 'esad.scheduleCreation','esad.errorView','esad.dataImport','esad.calendarGenerator'])

.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(true);
}])


.controller('EventController', function ($scope, $http, fileUpload, openConferenceFormat, displayError,calendarGenerator) {
  $scope.timetable = [];
  $scope.validJSON = false;
  $scope.error = [];

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

  var toMoment = function(event) {
      event.startTime = moment(event.startTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
      event.endTime = moment(event.endTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
      for (var i = 0; i < event.subEvents.length; i++) {
          event.subEvents[i].startTime = moment(event.subEvents[i].startTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
          event.subEvents[i].endTime = moment(event.subEvents[i].endTime).format("dddd, MMMM Do YYYY, h:mm:ss a");
      }
    return event;
  };

  $scope.onFileLoad = function (e) {
    $scope.errors = [];
    var eventJSON = JSON.parse(e.target.result);
    var result = $scope.validateFile(eventJSON);
    if (result.valid === false) {
      //Handle Error States
      $scope.event = null;
      result.errors.forEach(function (error) {
        console.error(error);
      });
      displayError.display(result.errors);
      var eventJSON = {};
      return;
    } else {
      $scope.filename = fileUpload.file();
      $scope.validJSON = true;
      $scope.event = eventJSON.event;
      $scope.generateTimetable();
      $scope.event = toMoment($scope.event);
      console.log($scope);
      calendarGenerator.init($scope.event);
    }
    $scope.$apply();
  };


  //Useful for testing :v
  $scope.validateFile = function(json){
    return openConferenceFormat.validate(json);
  };

  $scope.makeICS = function(){
    console.log($scope);
    calendarGenerator.buildWithSubEvents($scope.event.subEvents);
  };

  $scope.generateTimetable = function(event){

    event = event || $scope.event;

    if (!$scope.validJSON){
      return [];
    }
    $scope.timetable = [];
    var times =  getUniqueOccurances(event.subEvents,"startTime");
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

  $scope.fuckShitUp = function () {
    console.log('Saved Schedule:', calendarGenerator.getSchedule());
    $scope.generateTimetable(calendarGenerator.getSchedule());
  }

});
