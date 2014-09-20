var gulp = require('gulp'),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),

    // keeps gulp from crashing when Coffeescript generates an error
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

require('gulp-grunt')(gulp);


var coffeeFiles = [
  'coffee/main.coffee'
];

gulp.task('coffee', function(){
  gulp.src(coffeeFiles)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('build/js'))
});

// Shell out Haml build command
gulp.task('haml', shell.task(
  'haml index.haml build/index.html'
));


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
  gulp.watch(coffeeFiles, ['coffee']);
  gulp.watch(["build/index.html", "build/js/*.js"], function(e){
    server.changed(e.path);
  });
});

// Test to see if gulp is installed
gulp.task('default', function() {
  console.log("gulp is found");
});
