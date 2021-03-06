// Single var pattern in full effect

// Define gulp
var gulp = require('gulp');

  // Utility plugins
  watch = require('gulp-watch'),//watch stuff
  minify = require('gulp-min'), // minify stuff
  concat = require('gulp-concat'), // concat stuff
  shell = require('gulp-shell'), // shell comands

  // Setup live reload
  livereload = require('gulp-livereload'),
  lr = require('tiny-lr'),
  server = lr(),

  /*
   * =================
   * JADE TASKS
   * =================
   */
  jade = require('gulp-jade'),

  /*
   * =================
   * CSS TASKS
   * =================
   */

  // task for removing unused CSS
  uncss = require('gulp-uncss'),

  // LESS
  less = require('gulp-less'),
  path = require('path'),

  // Add CSSLint
  csslint = require('gulp-csslint'),

  /*
   * =================
   * JAVASCRIPT TASKS
   * =================
   */

  // Coffescript
  coffee = require('gulp-coffee'),

  // keeps gulp from crashing when Coffeescript generates an error
  gutil = require('gulp-util'),

  /*
   * ========================
   * IMAGE MINIFICATION TASKS
   * ========================
   */

  imagemin = require('gulp-imagemin'),
  pngcrush = require('imagemin-pngcrush');

// Make the 'gulp-grunt' plugin work so grunt tasks can be run from Gulp
require('gulp-grunt')(gulp);


/*
 *  ===================================================================
 *  | START CSS BUILD-OUT |
 *
 *  The build-out is very detailed: it contains a lot of single tasks as
 *  well as tasks piped together via gulp.
 *  ===================================================================
 */



// Store a variable reference to the project's .less files
var lessFiles = ['less/*.less', 'less/**/*.less']; //LESS files

// LESS task...css_buildOut/style.less becomes css_buildOut/style.css
gulp.task('less', function() {
gulp.src(lessFiles)
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(gulp.dest('cssSrc/'));

});

// Define selectors that should be ignored when "uncss" removes unused
//  CSS
var ignoreArray = [
  'nav',
  '.scroll-nav',
  '.scroll-nav__list',
  '.scroll-nav__item'
  ];

// LESS task...css_buildOut/style.less becomes css_buildOut/style.css
gulp.task('startCssBuild',function () {
  gulp.src('cssSrc/*.css')
  .pipe(uncss({
    html: ['build/index.html'],
    ignore: ignoreArray
  }))
  .pipe(concat("style.css"))
  .pipe(gulp.dest('build/css/'))
  .pipe(csslint())
  .pipe(csslint.reporter());
});


gulp.task('dupes', shell.task(
  'css-purge -i build/css/style.css -o build/css/style.css'
));

gulp.task('buildcss', ['startCssBuild', 'dupes']);

/*
 *  ===================================================================
 *  | END CSS BUILD-OUT |
 *  ===================================================================
 */


/*
 *  ===================================================================
 *  | START JADE BUILD-OUT |
 *  ===================================================================
 */

// Jade global variables
var VARIABLES = {
  pageTitle: 'Page Title',
  metaD: 'Meta Description'
};

// Output Jade Files to build "index.html" & send it to "build/"
gulp.task('jade', function() {
  return gulp.src('jade/index.jade')
    .pipe(jade({
      locals: VARIABLES,
      pretty: true
    }))
    .pipe(gulp.dest('build'))
});

/*
 *  ===================================================================
 *  | END JADE BUILD-OUT |
 *  ===================================================================
 */


/*
 *  ===================================================================
 *  | START COFFEESCRIPT BUILD-OUT |
 *  ===================================================================
 */

// Store a variable reference to the project's .less files
var coffeeFiles = ['coffee/main.coffee'];

// COFFESCRIPT task
gulp.task('coffee', function(){
  gulp.src(coffeeFiles)
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('build/js'))
});


/*
 *  ===================================================================
 *  | END COFFEESCRIPT BUILD-OUT |
 *  ===================================================================
 */


/*
 * ==================================
 * COPY STUFF FROM 'bower_components'
 * ==================================
 *
 * Tasks for copying files from "bower_components" to somewhere else.
 * Uses the "grunt-bowercopy" plugin to do this via "gulp-grunt."
 */

// Copy all the site's JS librairies
gulp.task('libs', function() {
  gulp.run('grunt-bowercopy:js_libs');
});

// Copy jQuery only
gulp.task('jq', function() {
  gulp.run('grunt-bowercopy:jquery');
});

// Copy Bootstrap only
gulp.task('bs', function() {
  gulp.run('grunt-bowercopy:bs');
});

/*
 * ==================================
 * END STUFF FROM 'bower_components'
 * ==================================
 */


/*
 *  ===================================================================
 *  | START IMAGE MINIFICATION |
 *  ===================================================================
 */

// Minify images in "images" and move them over to "img"
gulp.task('images', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('build/img'));
});

/*
 *  ===================================================================
 *  | END IMAGE MINIFICATION |
 *  ===================================================================
 */


/*
 *  ===================================================================
 *  | START WATCH TASK |
 *
 * be careful of watching too much because it may eat up computer
 * memory...at least, it does in Grunt
 *  ===================================================================
 */

gulp.task('watch', function() {

  // If preprocesser files change, run the site build, then refresh it
  // in the browser via live reload
  var server = livereload();
  gulp.watch('jade/includes/*.jade', ['jade']);
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

/*
 *  ===================================================================
 *  | END WATCH TASK |
 *  ===================================================================
 */

// Test to see if gulp is installed
gulp.task('default', function() {
  console.log("gulp is found");
});
