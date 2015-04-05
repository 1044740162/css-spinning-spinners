module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
          files: [{
              expand: true,
              cwd: 'src/demo/',
              src: ['**/*.jade'],
              dest: 'demo/',
              ext: '.html'
          }]
      }
    },
    less: {
      src: {
        files: [
          { 
            expand: true,
            cwd: 'src/less/',
            src: ['**/*.less', '!**/load.less'],
            dest: 'dist/css/',
            ext: '.css'
          },
          { 
            expand: true,
            cwd: 'src/demo/less',
            src: ['**/*.less'],
            dest: 'demo/css/',
            ext: '.css'
          }
        ],
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'Opera >= 15', 'Chrome >= 4', 'Firefox >= 16', 'Safari >= 4']
      },
      css: {
        files: [
          {
            expand: true,
            flatten: true,
            src: 'dist/css/*.css',
            dest: 'dist/css/'
          },
          {
            expand: true,
            flatten: true,
            src: 'demo/css/*.css',
            dest: 'demo/css/'
          }
        ]
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['**/*.css'],
          dest: 'dist/css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      files: ['src/less/**/*.less','src/jade/**/*.jade'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.loadNpmTasks('grunt-contrib-less');
  
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less','autoprefixer','cssmin','jade','watch']);

  grunt.registerTask('deploy', ['less','autoprefixer','cssmin','jade']);

};