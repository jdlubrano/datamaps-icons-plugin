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
            'node_modules/d3/d3.min.js',
            'node_modules/topojson/build/topojson.min.js',
            'node_modules/datamaps/dist/datamaps.all.js'
          ],
          specs: [
            'tests/spec/DefinedWithDatamapsSpec.js',
            'tests/spec/*Spec.js',
            'tests/spec/SpecRunner*.html'
          ]
        }
      }
    },
    version: {
      project: {
        src: ['package.json', 'package.js']
      }
    },
    shell: {
      options: {
        failOnError: true,
      },
      meteor_test: {
        command: "node_modules/.bin/spacejam test-packages ./"
      },
      meteor_publish: {
        command: "meteor publish"
      },
      npm_publish: {
        command: "npm publish"
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-version');

  // Default task(s).
  grunt.registerTask('default', ['test', 'copy', 'uglify']);
  grunt.registerTask('test', ['jasmine:dev']);

  // To be run after re-versioning
  grunt.registerTask(
    'publish',
    [
      'default',
      'shell:meteor_test',
      'shell:npm_publish',
      'shell:meteor_publish'
    ]
  );

};
