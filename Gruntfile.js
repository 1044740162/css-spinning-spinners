module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      compile: {
          files: [{
              expand: true,
              cwd: 'jade/',
              src: ['**/*.jade'],
              dest: '',
              ext: '.html'
          }]
      }
    },
    less: {
      src: {
        expand: true,
        cwd: 'less/',
        src: ['**/*.less'],
        dest: 'css/',
        ext: '.css'
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'Opera >= 15', 'Chrome >= 4', 'Firefox >= 16', 'Safari >= 4']
      },
      css: {
        expand: true,
        flatten: true,
        src: 'css/*.css',
        dest: 'css/'
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['**/*.css'],
          dest: 'css/',
          ext: '.css'
        }]
      }
    },
    watch: {
      files: ['less/**/*.less','jade/**/*.jade'],
      tasks: ['default']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.loadNpmTasks('grunt-contrib-less');
  
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less','autoprefixer','cssmin','jade','watch']);

};