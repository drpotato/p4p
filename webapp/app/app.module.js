'use strict';

angular.module('esad', ['esad.fileUpload','esad.map', 'esad.stream', 'esad.subEvent', 'esad.openConferenceFormat', 'esad.schedule', 'esad.scheduleCreation','esad.errorView','esad.dataImport','esad.calendarGenerator', 'esad.listView', 'angularMoment', 'ngStorage', 'ngAnimate'])

.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.html5Mode(true);
}])


.controller('EventController', function ($scope, $http, $localStorage, fileUpload, openConferenceFormat, displayError, calendarGenerator) {
  
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
      event.startTime = moment(event.startTime);
      event.endTime = moment(event.endTime);
      for (var i = 0; i < event.subEvents.length; i++) {
          event.subEvents[i].startTime = moment(event.subEvents[i].startTime);
          event.subEvents[i].endTime = moment(event.subEvents[i].endTime);
          event.subEvents[i].isCollapsed = true;
      }
    return event;
  };

  $scope.onFileLoad = function (e) {
    $scope.errors = [];
    var eventJSON = JSON.parse(e.target.result);
    var result = $scope.validateFile(eventJSON);
    $scope.processValidatorResult(result,eventJSON);
    $scope.$apply();
  };
  
  $scope.processValidatorResult = function(result,eventJSON){
    if (result.valid === false) {
      //Handle Error States
      $scope.event = null;
      result.errors.forEach(function (error) {
        console.error(error);
      });
      displayError.display(result.errors);
      return;
    } else {
      $scope.filename = fileUpload.file();
      $scope.validJSON = true;
      $scope.event = eventJSON.event;
      $scope.generateTimetable();
      $scope.event = toMoment($scope.event);
      $scope.event.subEvents.sort(function (a, b) {
        return (a.startTime > b.startTime) - (a.startTime < b.startTime);
      });
      calendarGenerator.init($scope.event);
      $localStorage.event = $scope.event;
    }
    
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
      var streams = $scope.getStreamsAtTime(time, event);
      var events = $scope.getEventsAtTime(time, event);
      $scope.timetable.push({
        time: time,
        streams: streams,
        events: events
      });
    });
    $localStorage.timetable = $scope.timetable;
  };

  $scope.getStreamsAtTime = function(startTime, event){
    return getUniqueOccurances($scope.getEventsAtTime(startTime, event),"location");
  };

  $scope.getEventsAtTime = function(startTime, event){

    event = event || $scope.event;

    var events = [];
    event.subEvents.forEach(function(subEvent){
      if (subEvent.startTime === startTime){
        events.push(subEvent);
      }
    });
    return events;
  };

  $scope.fuckShitUp = function () {
    console.log('Saved Schedule:', calendarGenerator.getSchedule());
    $scope.generateTimetable(calendarGenerator.getSchedule());
  };

  $scope.isDifferentDay = function (index) {
    return index == 0 || moment($scope.event.subEvents[index].startTime).format('ddd D') != moment($scope.event.subEvents[index - 1].startTime).format('ddd D');
  };
  
  
  //Function definitions first
  $scope.timetable = $localStorage.timetable || [];
  $scope.validJSON = false;
  $scope.error = [];
  $scope.event = $localStorage.event;

  if ($localStorage.event){
    $scope.processValidatorResult($scope.validateFile($localStorage),$localStorage); 
  }
  

});
