'use strict';

angular.module('esad.calendarGenerator',[])


.factory('calendarGenerator',function(){
  
  var schedule = null;
  var savedSubEvents = [];
  
  var generate = function(subEvents){
    //TODO: maybe this can be an angular module so we don't have to declare it in the html as well?
    var cal = ics();
    
    
    subEvents.forEach(function(subEvent){
      console.log(subEvent);
      cal.addEvent(subEvent.title,subEvent.title,subEvent.location,subEvent.startTime, subEvent.endTime);
    });
    cal.download();
  }
  
  
  var addSubEvent = function(subEvent){
    savedSubEvents.push(subEvent);
    console.log(savedSubEvents);
  };
  
  var buildWithSubEvents = function(subEvents){
    return generate(subEvents)
  };
  
  var buildFromSavedEvents = function(){
    return generate(savedSubEvents);
  }
  
  return {
    buildWithSubEvents:buildWithSubEvents,
    buildFromSavedEvents:buildFromSavedEvents
  }
})
