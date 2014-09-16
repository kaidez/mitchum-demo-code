var gulp = require('gulp');
var shell = require('gulp-shell');

// Shell out Haml build command
gulp.task('haml', shell.task([
  'haml index.haml build/index.html'
]))

// Test to see if gulp is installed
gulp.task('default', function() {
  console.log("gulp is found");
});
