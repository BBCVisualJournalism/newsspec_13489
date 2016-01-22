module.exports = function(grunt) {

    grunt.initConfig({
        bake: {
            test: {
                files: {
                    "content/test.html": "source/test.html",
                }
            }
        }, 
        copy: {
            inc: {
                src: 'source/index.inc',
                dest: 'content/index.inc'
            },
            js: {
                src: 'source/js/*',
                dest: 'content/js/',
                flatten: true,
                expand: true
            }
        },
        watch: {
            files: ['source/**/*'],
            tasks: ['default'],
        } 
    });


    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-deploy-to-env');

    grunt.loadTasks('tasks');

    grunt.registerTask('build', ['bake:test', 'copy:inc', 'copy:js']);

    grunt.registerTask('default', ['build']);

};
