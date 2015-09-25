module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      all: {
        files: [
          { expand: true, flatten:true, src: 'src/<%= pkg.name %>.js', dest: 'build/' }
        ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    clean: {
      build: 'build/*'
    },
    jasmine: {
      dev: {
        src: 'src/<%= pkg.name %>.js',
        options: {
          vendor: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            'node_modules/datamaps/node_modules/d3/d3.min.js',
            'node_modules/datamaps/node_modules/topojson/topojson.min.js',
            'node_modules/datamaps/dist/datamaps.all.js'
          ],
          specs: [
            'tests/spec/DefinedWithDatamapsSpec.js',
            'tests/spec/*Spec.js',
            'tests/spec/SpecRunner*.html'
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'uglify']);
  grunt.registerTask('test', ['jasmine:dev']);

};
