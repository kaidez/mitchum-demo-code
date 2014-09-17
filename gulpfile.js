var gulp = require('gulp');
var shell = require('gulp-shell');
var watch = require('gulp-watch');

// Shell out Haml build command
gulp.task('haml', shell.task(
  'haml index.haml build/index.html'
));

//watch
gulp.task('watch', function() {

  // If 'index.haml', changes, build out 'index.html'
  gulp.watch('index.haml', ['haml']);
});

// Test to see if gulp is installed
gulp.task('default', function() {
  console.log("gulp is found");
});
