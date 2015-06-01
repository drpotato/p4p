var EventValidator = require('./js/event.js');
var fs = require('fs');
var assert = require('assert');
var chai = require('chai');

var eventValidator = new EventValidator();

describe('Validate', function() {
    it('Should Pass a Valid JSON file', function(done) {
        var json =JSON.parse(fs.readFileSync('samples/testEvent.json'));
        chai.assert.isUndefined(eventValidator.validate(json).errors);
        done();
    });
    
    
    it('Should Fail a file with no title', function(done) {
        var json =JSON.parse(fs.readFileSync('samples/testEvent_title.json'));
        chai.assert(eventValidator.validate(json) !==  true,"An Error Must be Thrown");
        done();
    });
});