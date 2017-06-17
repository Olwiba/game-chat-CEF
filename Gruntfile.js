// Gruntfile.js

module.exports = function (grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js']
    },
    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/hello.min.js': 'src/js/*.js'
          // Multiple files: 'dist/js/magic.min.js': ['src/js/magic.js', 'src/js/magic2.js']
        }
      }
    },
    // Configure sass
    sass: {
      dist: {
        files: {
          'src/css/style.css': 'src/sass/*.scss'
        }
      }
    },
    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'src/css/style.css',
          'dist/css/vendor/style.min.css': 'src/css/vendor/*.css'
        }
      }
    },
    // configure watch to auto update ----------------
    watch: {

      // for stylesheets, watch css and less files 
      // only run less and cssmin stylesheets: { 
      files: ['src/css/*.css', 'src/css/vendor/*.css', 'src/sass/*.scss'],
      tasks: ['sass', 'cssmin'],

      // for scripts, run jshint and uglify 
      scripts: {
        files: 'src/**/*.js', tasks: ['jshint', 'uglify']
      }
    }

    

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'sass', 'cssmin']);
};