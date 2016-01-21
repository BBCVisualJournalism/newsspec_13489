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
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });


    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-deploy-to-env');

    grunt.loadTasks('tasks');

    grunt.registerTask('build', ['bake:test', 'copy:inc']);

    grunt.registerTask('default', ['build']);

};
