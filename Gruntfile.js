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
      files: ['src/less/*.less','src/jade/*.jade'],
      tasks: ['default']
    },
    'gh-pages': {
      options: {
        branch: 'gh-pages',
        only: ['**/*','!README.md','!images/**/*'],
      },
      deploy: {
        options: {
          move: [{base: 'demo/', src: '**/*', dest: '/'}, {base: 'dist/css/', src: '**/*.css', dest: 'css/'}],
          replace: [{files: 'index.html', regex: /\.\.\/dist\/css/g, replacement: 'css'}],
          user: {
            name: 'Travis CI',
            email: 'travis@billynate.com'
          },
          repo: 'https://' + process.env.GH_TOKEN + '@github.com/' + process.env.TRAVIS_REPO_SLUG,
          silent: true,
          message: 'Travis build ' + getDeployMessage()
        },
        src: ['demo/**/*','dist/**/*']
      }
    }
  });

  // get a formatted commit message to review changes from the commit log
  // github will turn some of these into clickable links
  function getDeployMessage()
  {
    var ret = '\n\n';
    if(process.env.TRAVIS !== 'true')
    {
      ret += 'missing env vars for travis-ci';
      return ret;
    }
    ret += 'branch:       ' + process.env.TRAVIS_BRANCH + '\n';
    ret += 'SHA:          ' + process.env.TRAVIS_COMMIT + '\n';
    ret += 'range SHA:    ' + process.env.TRAVIS_COMMIT_RANGE + '\n';
    ret += 'build id:     ' + process.env.TRAVIS_BUILD_ID  + '\n';
    ret += 'build number: ' + process.env.TRAVIS_BUILD_NUMBER + '\n';
    return ret;
  }

  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.loadNpmTasks('grunt-contrib-less');
  
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['less','autoprefixer','cssmin','jade']);

  grunt.registerTask('deploy', ['gh-pages']);

  grunt.registerTask('dev', ['default','watch']);

};