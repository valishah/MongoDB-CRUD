var assert = require('assert');
var courseSchema = require('../course');
var fs = require('fs');
var mongoose = require('mongoose');
var studentSchema = require('../student');

/**
 *  This test suite is meant to be run through gulp (use the `npm run watch`)
 *  script. It will provide you useful feedback while filling out the API in
 *  `interface.js`. You should **not** modify any of the below code.
 */
describe('Mongoose Schemas', function() {
  var Course = mongoose.model('Course', courseSchema, 'courses');
  var Student = mongoose.model('Student', studentSchema, 'students');
  var succeeded = 0;
  var course;

  describe('Student', function() {
    it('has a `firstName` virtual', function() {
      var student = new Student({ name: 'William Bruce Bailey' });

      assert.equal(student.firstName, 'William');
      ++succeeded;
    });

    it('has a `lastName` virtual', function() {
      var student = new Student({ name: 'William Bruce Rose' });

      assert.equal(student.lastName, 'Rose');
      ++succeeded;
    });
  });

  describe('Course', function() {
    it('has an _id field that\'s a required string', function(done) {
      var course = new Course({});

      course.validate(function(err) {
        assert.ok(err);
        assert.equal(err.errors['_id'].kind, 'required');

        course._id = 'CS-101';
        assert.equal(course._id, 'CS-101');
        ++succeeded;
        done();
      });
    });

    it('has an title field (required string, max length 140)', function(done) {
      var course = new Course({});

      course.validate(function(err) {
        assert.ok(err);
        assert.equal(err.errors['title'].kind, 'required');

        course.title = 'Introduction to Computer Science';
        assert.equal(course.title, 'Introduction to Computer Science');

        var s = '0123456789';
        course.title = '';
        while (course.title.length < 150) {
          course.title += s;
        }

        course.validate(function(err) {
          assert.ok(err);
          assert.equal(err.errors['title'].kind, 'maxlength');

          ++succeeded;
          done();
        });
      });
    });

    it('has an description field that\'s a required string', function(done) {
      var course = new Course({});

      course.validate(function(err) {
        assert.ok(err);
        assert.equal(err.errors['description'].kind, 'required');

        course.description = 'This course provides an overview of Computer ' +
          'Science';
        assert.equal(course.description, 'This course provides an overview ' +
          'of Computer Science');
        ++succeeded;
        done();
      });
    });

    it('has a `requirements` field containing array of course numbers', function() {
      course = new Course({
        _id: 'CS-102',
        requirements: ['CS-101']
      });

      assert.equal(course.requirements.length, 1);
      course.requirements.push('MATH-101');
      assert.equal(course.requirements.length, 2);
      assert.equal(course.requirements[0], 'CS-101');
      assert.equal(course.requirements[1], 'MATH-101');
      ++succeeded;
    });
  });


});
