// Single var pattern in full effect

// Define gulp
var gulp = require('gulp'),

    // Utility plugins
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),

    // Setup live reload
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr(),

    //START PAGE STRUCTURE PLUGINS

    // Add uncss task
    uncss = require('gulp-uncss'),

    // Coffescript
    coffee = require('gulp-coffee'),

    // Store a variable reference to the project's main .coffee file
    coffeeFiles = ['coffee/main.coffee'],

    // keeps gulp from crashing when Coffeescript generates an error
    gutil = require('gulp-util'),

    // LESS
    less = require('gulp-less'),
    path = require('path'),

    // Store a variable reference to the project's main .less file
    lessFiles = ['less/style.less'];

// Make the 'gulp-grunt' plugin work so grunt tasks can be run from Gulp
require('gulp-grunt')(gulp);

// HAML task
// Shell out Haml build command
gulp.task('haml', shell.task(
  'haml haml/index.haml build/index.html'
));

// COFFESCRIPT task
gulp.task('coffee', function(){
  gulp.src(coffeeFiles)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('build/js'))
});

// LESS task
gulp.task('less', function () {
  gulp.src(lessFiles)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('build/css'));
});

// uncss task: remove unused files from core Bootstrap CSS file
gulp.task('uncss', function() {
  return gulp.src('bower_components/bootstrap/dist/css/bootstrap.css')
  .pipe(uncss({
    html: ['build/index.html']
  }))
  .pipe(gulp.dest('build/css/'));
});

/*
 * ==================================
 * COPY STUFF FROM 'bower_components'
 * ==================================
 *
 * Tasks for copying files from "bower_components" to somewhere else.
 * Uses the "grunt-bowercopy" plugin to do this via "gulp-grunt."
 */

// Copy everything
gulp.task('libs', function() {
  gulp.run('grunt-bowercopy:js_libs');
});

// Copy jQuery only
gulp.task('jq', function() {
  gulp.run('grunt-bowercopy:jquery');
});

// watch task: be careful of watching too much because it may eat up
// computer memory...at least, it does in Grunt
gulp.task('watch', function() {

  // If preprocesser files change, run the site build, then refresh it
  // in the browser via live reload
  var server = livereload();
  gulp.watch('haml/index.haml', ['haml']);
  gulp.watch(lessFiles, ['less']);
  gulp.watch(coffeeFiles, ['coffee']);
  gulp.watch([
    "build/index.html",
    "build/css/*.css",
    "build/js/*.js"
    ], function(e) {
      server.changed(e.path);
  });
});

// Test to see if gulp is installed
gulp.task('default', function() {
  console.log("gulp is found");
});
