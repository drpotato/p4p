'use strict';

angular.module('esad.calendarGenerator',[])


.factory('calendarGenerator',function(){
  
  var schedule = null;
  var savedSubEvents = {};
  var listeners = [];
  
  var generate = function(subEvents){
    //TODO: maybe this can be an angular module so we don't have to declare it in the html as well?
    var cal = ics();
    
    
    angular.forEach(subEvents,function(subEvent){
      cal.addEvent(subEvent.title,subEvent.title,subEvent.location,subEvent.startTime, subEvent.endTime);
    });
    cal.download();
  }
  
  
  
  var addSubEvent = function(subEvent){
    savedSubEvents[subEvent] = subEvent;
    notifyListeners(subEvent,"saved");
  };
  
  var removeSubEvent = function(subEvent){
    savedSubEvents[subEvent] = undefined;
    notifyListeners(subEvent,"removed");
  };
  
  var getSubEventSaveStatus = function(subEvent){
    if (savedSubEvents[subEvent]){
      return "saved";
    }else{
      return "removed";
    }
  };
  
  var notifyListeners = function(subEvent,status){
    listeners.forEach(function(listener){
      if (listener.subEvent === subEvent){
        listener.callback(status);
      }
    });
  }
  
  var onSubEventSaveStatusChange = function(subEvent,callback){
    listeners.push({
      subEvent:subEvent,
      callback:callback
    });
  };
  
  var buildWithSubEvents = function(subEvents){
    return generate(subEvents)
  };
  
  var buildFromSavedEvents = function(){
    return generate(savedSubEvents);
  }
  
  return {
    buildWithSubEvents:buildWithSubEvents,
    buildFromSavedEvents:buildFromSavedEvents,
    addSubEvent:addSubEvent,
    removeSubEvent:removeSubEvent,
    getSubEventSaveStatus:getSubEventSaveStatus,
    onSubEventSaveStatusChange:onSubEventSaveStatusChange
  }
})
