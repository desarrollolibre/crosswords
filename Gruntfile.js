module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      build: {
        cwd: 'node_modules/jquery',
        src: ['jquery.js'],
        dest: 'js/lib',
        expand: true
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', ['copy']);
};
