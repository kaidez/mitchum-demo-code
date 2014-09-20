module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowercopy: {

      // don't send messages to saying that Bower components aren't
      // configured...ignore them instead
      options:{
        ignore: ['less','gulp','normalize-less', 'jquery'],
        runBower: false
      },
      css_build: {
        // copy over cs files
        options: {
          destPrefix: 'build/css'
        },
        files: {
          'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css'
        }
      }, // end css_build

      // start task for copying over JS libraries
      js_libs: {

        // copy JS libraries over to "build/js/libs"
        options: {
          destPrefix: 'build/js/libs'
        },

        // libraries that need to be copied...listed in the order they
        // would appear on "index.html"
        files: {
          'masonry.min.js': 'masonry/dist/masonry.pkgd.min.js',
          'scrollNav.min.js': 'scrollNav/dist/jquery.scrollNav.min.js'
        }
      }, // end js_libslibs
      jquery: {
        options: {
          destPrefix: 'build/js/libs'
        },
        files: {
          'jquery.min.js': 'jquery/dist/jquery.min.js',
        }
      }
    } // end bowercopy
  });

  grunt.loadNpmTasks('grunt-bowercopy');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);

};
