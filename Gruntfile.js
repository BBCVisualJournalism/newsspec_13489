module.exports = function(grunt) {

    grunt.initConfig({
        bake: {
            test: {
                files: {
                    "dist/test.html": "src/test.html",
                }
            }
        }, 
        copy: {
            inc: {
                src: 'src/index.inc',
                dest: 'dist/index.inc'
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

    grunt.registerTask('build', ['bake:test', 'copy:inc']);

    grunt.registerTask('default', ['build']);

};
