'use strict';

angular.module('esad.dataImport')

.factory('openConfXML', function() {
  
    var parse = function(xmlString){
      var oParser = new DOMParser();
      var oDOM = oParser.parseFromString(xmlString, "text/xml");    
      return oDOM;
    };
    
    var convert = function(document){
      
      var eventTitle = document.querySelector('event').innerHTML;
      var location = "";
      var organiser = document.querySelector('event_url').innerHTML;
      
      
      
      //console.log(document.querySelectorAll('timeslot'));
      var subEvents = [];
      var timeslots = document.querySelectorAll('timeslot');
      for (var i =0;i<timeslots.length;i++){
          var timeslot = timeslots[i];
          parseTimeSlot(timeslot,subEvents);
      }
      
      var eventJSON = {
        "event":{
          "title":eventTitle,
          "location":location,
          "organiser":organiser,
          "subEvents":subEvents
        }
      };
      
      return eventJSON;
    };
  
  
    var parseTimeSlot = function(timeslot,subEvents){
      
      var startTime = timeslot.querySelector('timeslot_start').innerHTML;
      var endTime = timeslot.querySelector('timeslot_end').innerHTML;
      var title = timeslot.querySelector('timeslot_title').innerHTML;
      
      var sessions = timeslot.querySelectorAll('session');
      for (var i =0;i<sessions.length;i++){
        var session = sessions[i];
        
        if (session.querySelector('presentations') === null || session.querySelectorAll('presentation').length === 0){
        
          var subTitle = session.querySelector('session_title').innerHTML;
          var location = session.querySelector('session_room').innerHTML;
          var description = session.querySelector('session_page').innerHTML;
          var type = session.querySelector('session_type').innerHTML;
          
          subEvents.push({
            "title": title,
            "location": location,
            "startTime": startTime,
            "endTime": endTime,
            "description": description,
            "type": type,
            "people": [
              /*{
                "name": "Charu Wadhwa",
                "role": "Student"
              }*/
            ],
            "tags": []
          });
          
        }else{
          var presentations = session.querySelectorAll('presentation');
          for (var j =0;j<presentations.length;j++){
            parsePresentation(presentations[j],session,timeslot,subEvents);
          }
        }
       
          
      }
    };
  
    var parsePresentation = function(presentation,session,timeslot,subEvents){
      var subTitle = presentation.querySelector('presentation_title').innerHTML;
      var location = session.querySelector('session_room').innerHTML;
      var description = presentation.querySelector('abstract').innerHTML;
      var startTime = timeslot.querySelector('timeslot_start').innerHTML;
      var endTime = timeslot.querySelector('timeslot_end').innerHTML;
      var type = session.querySelector('session_type').innerHTML;
      
      var people = [];
      for (var i=0;i<presentation.querySelectorAll("author").length;i++){
        var author = presentation.querySelectorAll("author")[i];
        people.push({
          "name": author.querySelector("name_first").innerHTML + " " + author.querySelector("name_last").innerHTML,
          "organisation": author.querySelector("organization").innerHTML ,
          "role":"Author"
        });
      }

      subEvents.push({
        "title": subTitle,
        "location": location,
        "startTime": startTime,
        "endTime": endTime,
        "description": description,
        "type": type,
        "people": people,
        "tags": []
      });
    }

    return {
      parse:parse,
      convert:convert
    }
  });
