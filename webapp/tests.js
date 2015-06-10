var EventValidator = require('./js/event.js');
var fs = require('fs');
var assert = require('assert');
var chai = require('chai');

var eventValidator = new EventValidator();

describe('Validate', function() {
    it('Should Pass a Valid JSON file', function(done) {
        var json =JSON.parse(fs.readFileSync('samples/testEvent.json'));
        chai.assert(eventValidator.validate(json) === true,"Should return true");
        done();
    });
    
    
    it('Should Fail a file with no title', function(done) {
        var json =JSON.parse(fs.readFileSync('samples/testEvent_title.json'));
        chai.assert(eventValidator.validate(json) !==  true,"An Error Must be Thrown");
        done();
    });
    
    it('Should Fail a file with no Organiser', function(done) {
        var json =JSON.parse(fs.readFileSync('samples/testEvent_organiser.json'));
        chai.assert(eventValidator.validate(json) !==  true,"An Error Must be Thrown");
        done();
    });
    
    it('Should Fail a file with no sub events', function(done) {
        var json =JSON.parse(fs.readFileSync('samples/testEvent_subEvents.json'));
        chai.assert(eventValidator.validate(json) !==  true,"An Error Must be Thrown");
        done();
    });
});