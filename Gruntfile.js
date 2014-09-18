module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    wiredep: {

      target: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'app/views/**/*.html',   // .html support...
          'app/views/**/*.jade',   // .jade support...
          'app/styles/main.scss',  // .scss & .sass support...
          'app/config.yml'         // and .yml & .yaml support box!
        ],

        // Optional:
        // ---------
        options: {
          cwd: '',
          dependencies: true,
          devDependencies: false,
          exclude: [],
          fileTypes: {},
          ignorePath: '',
          overrides: {}
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');

  // Default task(s).
  // grunt.registerTask('default', ['uglify']);

};
