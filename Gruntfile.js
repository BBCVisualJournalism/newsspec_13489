module.exports = function(grunt) {
    var _ = require('lodash');

    var statesAndDates = [
        // {'date': '0201', 'state': 'IW', 'party': 'Dem'},
        // {'date': '0201', 'state': 'IW', 'party': 'GOP'},
        // {'date': '0209', 'state': 'NH', 'party': 'Dem'},
        // {'date': '0209', 'state': 'NH', 'party': 'GOP'},
        // {'date': '0220', 'state': 'NV', 'party': 'Dem'},
        // {'date': '0220', 'state': 'SC', 'party': 'GOP'},
        // {'date': '0223', 'state': 'NV', 'party': 'GOP'},
        // {'date': '0227', 'state': 'SC', 'party': 'Dem'},
        // {'date': '0301', 'state': 'AL', 'party': 'Dem'},
        // {'date': '0301', 'state': 'AR', 'party': 'Dem'},
        // {'date': '0301', 'state': 'GA', 'party': 'Dem'},
        // {'date': '0301', 'state': 'MA', 'party': 'Dem'},
        // {'date': '0301', 'state': 'MN', 'party': 'Dem'},
        // {'date': '0301', 'state': 'OK', 'party': 'Dem'},
        // {'date': '0301', 'state': 'TN', 'party': 'Dem'},
        // {'date': '0301', 'state': 'VT', 'party': 'Dem'},
        // {'date': '0301', 'state': 'VA', 'party': 'Dem'},
        // {'date': '0301', 'state': 'AL', 'party': 'GOP'},
        // {'date': '0301', 'state': 'AR', 'party': 'GOP'},
        // {'date': '0301', 'state': 'GA', 'party': 'GOP'},
        // {'date': '0301', 'state': 'MA', 'party': 'GOP'},
        // {'date': '0301', 'state': 'MN', 'party': 'GOP'},
        // {'date': '0301', 'state': 'OK', 'party': 'GOP'},
        // {'date': '0301', 'state': 'TN', 'party': 'GOP'},
        // {'date': '0301', 'state': 'VT', 'party': 'GOP'},
        // {'date': '0301', 'state': 'VA', 'party': 'GOP'},
        // {'date': '0301', 'state': 'AK', 'party': 'GOP'},
        // {'date': '0301', 'state': 'CO', 'party': 'Dem'},
        // {'date': '0305', 'state': 'KS', 'party': 'GOP'},
        // {'date': '0305', 'state': 'KS', 'party': 'Dem'},
        // {'date': '0305', 'state': 'KY', 'party': 'GOP'},
        // {'date': '0305', 'state': 'LA', 'party': 'GOP'},
        // {'date': '0305', 'state': 'LA', 'party': 'Dem'},
        // {'date': '0305', 'state': 'ME', 'party': 'GOP'},
        // {'date': '0305', 'state': 'NE', 'party': 'Dem'},
        // {'date': '0306', 'state': 'ME', 'party': 'Dem'},
        // {'date': '0322', 'state': 'AZ', 'party': 'Dem'},
        // {'date': '0322', 'state': 'AZ', 'party': 'GOP'},
        // {'date': '0322', 'state': 'ID', 'party': 'Dem'},
        // {'date': '0322', 'state': 'UT', 'party': 'Dem'},
        // {'date': '0322', 'state': 'UT', 'party': 'GOP'},
        // {'date': '0405', 'state': 'WI', 'party': 'GOP'},
        // {'date': '0405', 'state': 'WI', 'party': 'Dem'},
        // {'date': '0409', 'state': 'WY', 'party': 'GOP'},
        // {'date': '0409', 'state': 'WY', 'party': 'Dem'},
        {'date': '0503', 'state': 'IN', 'party': 'Dem'},
        {'date': '0503', 'state': 'IN', 'party': 'GOP'}
    ];

    var bakeContentOptions = function () {
        var contentObject = {};
        for(var i = 0; i < statesAndDates.length; i++) {
            var map = statesAndDates[i];
            var mapId = map.state.toLowerCase() + map.party.toLowerCase();
            contentObject[mapId] = map;
        }
        return contentObject;
    }();

    var bakeGeneratedFiles = function () {
        var generatedFiles = {};
        for(var i = 0; i < statesAndDates.length; i++) {
            var map = statesAndDates[i];
            var mapId = map.state.toLowerCase() + map.party.toLowerCase();

            var state = map.state.toLowerCase();
            var party = map.party.toLowerCase();

             generatedFile = {
                options: {
                    section: mapId,
                    content: {},
                },
                files: {
                }
            };

            generatedFile.files['content/elections_map_' + state + '_' + party + '_test.html'] = 'source/elections_map_generator_test.html';
            generatedFile.files['content/elections_map_' + state + '_' + party + '.inc'] = 'source/elections_map_generator.inc';
            generatedFile.files['content/elections_map_' + state + '_' + party + '.inc.app.html'] = 'source/elections_map_generator.inc.app.html';
            generatedFile.options.content[mapId] = bakeContentOptions[mapId];

            generatedFiles[mapId] = generatedFile;
        }
        return generatedFiles;
    }();

    var bakeStandard = {
        standard: {
            files: {
                'content/test.html': 'source/test.html',
                'content/overview_test.html': 'source/overview_test.html',
                'content/iowa_primary_election_results_test.html': 'source/iowa_primary_election_results_test.html',
                'content/delegate_tracker_test.html': 'source/delegate_tracker_test.html',
                'content/index.inc.app.html': 'source/index.inc.app.html',
                'content/iowa_primary_election_results.inc.app.html': 'source/iowa_primary_election_results.inc.app.html',
                'content/delegate_tracker.inc.app.html': 'source/delegate_tracker.inc.app.html',
                'content/map_election_results.inc': 'source/map_election_results.inc',
                'content/map_election_results_test.html': 'source/map_election_results_test.html',
                'content/map_election_results.inc.app.html': 'source/map_election_results.inc.app.html'
            },
        }
    };

    var bakeConfig = _.merge(bakeStandard, bakeGeneratedFiles);

    var bakeBuildTasks = function () {
        var buildTasks = [];
        for(var i = 0; i < statesAndDates.length; i++) {
            var map = statesAndDates[i];
            var mapId = map.state.toLowerCase() + map.party.toLowerCase();

            buildTasks.push('bake:' + mapId);
        }
        return buildTasks;
    }();

    bakeConfig = (JSON.parse(JSON.stringify(bakeConfig)));


    grunt.initConfig({
        bake: bakeConfig,
        copy: {
            inc: {
                expand: true,
                flatten: true,
                src: ['source/*.inc'],
                dest: 'content/'
            },
            css: {
                expand: true,
                flatten: true,
                src: ['source/css/*.css'],
                dest: 'content/css'
            }
        },
        uglify: {
            js: {
                files: {
                    'content/js/elementresizer.js': ['source/js/elementresizer.js'],
                    'content/js/postmessageresizer.js': ['source/js/postmessageresizer.js'],
                    'content/js/iframe-map.js': ['source/js/iframe-map.js'],
                    'content/js/iframe-delegates.js': ['source/js/iframe-delegates.js']
                }
            }
        },
        watch: {
            files: ['source/**/*'],
            tasks: ['default'],
        }
    });

    grunt.registerTask('overwrite-files', function () {
        grunt.file.expand('content/**').forEach(function (file) {
            if (!grunt.file.isDir(file)) {
                grunt.log.writeln('Overwriting: ' + file);
                grunt.file.write(file, '');
            }
        });

        grunt.log.writeln('');
        grunt.log.ok('Content directory has been blanked out. You should now deploy and FTP to the env you want to disable');
    });


    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-deploy-to-env');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadTasks('tasks');

    grunt.registerTask('build', ['bake', 'copy:inc', 'copy:css', 'uglify:js']);
    grunt.registerTask('disable', ['build', 'overwrite-files']);

    grunt.registerTask('default', ['build']);

};
