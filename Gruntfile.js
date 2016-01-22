module.exports = function(grunt) {

    grunt.initConfig({
        bake: {
            test: {
                files: {
                    "content/test.html": "source/test.html",
                    "content/index.inc.app.html": "source/index.inc.app.html"
                }
            }
        }, 
        copy: {
            inc: {
                src: 'source/index.inc',
                dest: 'content/index.inc'
            }
        },
        uglify: {
            js: {
                files: {
                    'content/js/elementresizer.js': ['source/js/elementresizer.js']
                }
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
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadTasks('tasks');

    grunt.registerTask('build', ['bake:test', 'copy:inc', 'uglify:js']);

    grunt.registerTask('default', ['build']);

};
