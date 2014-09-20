var gulp = require('gulp'),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

require('gulp-grunt')(gulp);

// Shell out Haml build command
gulp.task('haml', shell.task(
  'haml index.haml build/index.html'
));

//
gulp.task('libs', function() {
  gulp.run('grunt-bowercopy:js_libs');
});

gulp.task('jq', function() {
  // run complete grunt tasks
  gulp.run('grunt-bowercopy:jquery');
});

//watch
gulp.task('watch', function() {

  // If 'index.haml', changes, build out 'index.html'
  var server = livereload();
  gulp.watch('index.haml', ['haml']);
  gulp.watch("build/index.html", function(e){
    server.changed(e.path);
  });
});

// Test to see if gulp is installed
gulp.task('default', function() {
  console.log("gulp is found");
});
