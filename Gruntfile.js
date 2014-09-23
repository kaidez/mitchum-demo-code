module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowercopy: {

      // don't send messages to saying that Bower components aren't
      // configured...ignore them instead
      options:{
        ignore: ['less','gulp','jquery'],
        runBower: false
      },

      // copy CSS files over the "build/css" directory
      css_build: {
        // copy over css files
        options: {
          destPrefix: 'build/css'
        },
        files: {
          'bootstrap-custom.css': 'bootstrap/dist/css/bootstrap.min.css'
        }
      }, // end css_build

      less: {

        // copy less files over the "less" directory
        options: {
          destPrefix: 'less'
        },
        files: {
          'normalize.less': 'normalize-less/normalize.less'
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
      }, // end "js_libs" task

      // start task for copying over jQuery
      jquery: {

        // copy core jQuery over to "build/js/libs"
        options: {
          destPrefix: 'build/js/libs'
        },
        files: {
          'jquery.min.js': 'jquery/jquery.min.js',
        }
      } // end "jquery" task
    }
  });

  grunt.loadNpmTasks('grunt-bowercopy');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);

};
