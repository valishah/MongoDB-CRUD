var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  var error = false;
  return gulp.
    src('test/*.js').
    pipe(mocha()).
    on('error', function() {
      console.log('Tests failed!');
      error = true;
    });
});

gulp.task('watch', function() {
  gulp.watch(['./test/*.js', './interface.js'], ['test']);
});
