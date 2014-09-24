// Single var pattern in full effect

// Define gulp
var gulp = require('gulp');

    // Utility plugins
  var watch = require('gulp-watch'); //watch stuff
  var minify = require('gulp-min'); // minify stuff
  var shell = require('gulp-shell'); // shell comands

  var concat = require('gulp-concat');

// Setup live reload
var livereload = require('gulp-livereload')

var lr = require('tiny-lr');
var server = lr();

//START PAGE STRUCTURE PLUGINS

// Add uncss task
var uncss = require('gulp-uncss');

// Add csslint task
var csslint = require('gulp-csslint');

    // Coffescript
var coffee = require('gulp-coffee');

    // Store a variable reference to the project's main .coffee file
    var coffeeFiles = ['coffee/main.coffee'],

    // keeps gulp from crashing when Coffeescript generates an error
    gutil = require('gulp-util'),

    // LESS
    less = require('gulp-less'),
    path = require('path'),

    // Store a variable reference to the project's main .less file
    lessFiles = ['css_buildOut/style.less'],

    // Image minificaiton
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush');

// Make the 'gulp-grunt' plugin work so grunt tasks can be run from Gulp
require('gulp-grunt')(gulp);


/*
 *  ===================================================================
 *  | CSS BUILD-OUT |
 *
 *  The build-out is very detailed: it contains a lot of single tasks as
 *  well as tasks piped together via gulp.
 *  ===================================================================
 */

 // Copy "bootstrap.min.css" only
 gulp.task('bs', function() {
   gulp.run('grunt-bowercopy:bs');
 });

 // Copy "normalize.less" only
 gulp.task('norm', function() {
   gulp.run('grunt-bowercopy:norm');
 });

// LESS task...css_buildOut/style.less becomes css_buildOut/style.css
gulp.task('less', function () {
gulp.src(["less/style.less", "less/scrollNav.less"])
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(gulp.dest('css_buildOut/'))
});


// Concatenate some CSS files and send them to "build/css"
gulp.task('cssc', function () {
  gulp.src('css_buildOut/*.css')
    .pipe(concat("style.css"))
    .pipe(gulp.dest('build/css/'));
});



// uncss task: remove unused files from core Bootstrap CSS file
gulp.task('uncss', function() {
  return gulp.src('build/css/style.css')
  .pipe(uncss({
    html: ['build/index.html'],
    ignore: ['.scroll-nav', '.scroll-nav__list']

  }))
  .pipe(gulp.dest('build/'));
});

// CSSLINT task
gulp.task('lint', function() {
  gulp.src('build/css/style.css')
    .pipe(csslint())
    .pipe(csslint.reporter());
});












// HAML task
// Shell out Haml build command
gulp.task('haml', shell.task(
  'haml haml/index.haml build/index.html'
));

gulp.task('dupes', shell.task(
  'css-purge -i build/css/style.css -o build/css/styles.min.css'
));






// COFFESCRIPT task
gulp.task('coffee', function(){
  gulp.src(coffeeFiles)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('build/js'))
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



gulp.task('images', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('build/img'));
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
