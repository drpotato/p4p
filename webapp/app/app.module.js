'use strict';

angular.module('esad', ['esad.fileUpload','esad.map', 'esad.stream', 'esad.subEvent', 'esad.openConferenceFormat', 'esad.schedule', 'esad.scheduleCreation','esad.errorView','esad.dataImport'])

.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(true);
}])


.controller('EventController', function ($scope, $http, fileUpload, openConferenceFormat, displayError) {
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
      console.log(eventJSON);
      $scope.validJSON = true;
      $scope.event = eventJSON.event;
      $scope.generateTimetable();
      $scope.event = toMoment($scope.event);
    }
    $scope.$apply();
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
