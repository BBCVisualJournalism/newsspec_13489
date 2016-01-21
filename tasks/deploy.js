module.exports = function(grunt) {

    var PROJECT_YEAR    = '2016',
        PROJECT_NUMBER  = '13489';

    var path = require('path'),
        sourceFiles = path.join(__dirname, '../content');

    var env = function getEnvData() {
        var env = {
            'local': {
                'domain':       'http://local.bbc.co.uk:1031',
                'domainStatic': 'http://static.local.bbc.co.uk:1033'
            }
        };
        var environmentFilePath = path.join(__dirname, '../../../env.json');
        if (grunt.file.exists(environmentFilePath)) {
            env = grunt.file.readJSON(environmentFilePath);
        }
        else {
            grunt.log.warn('env.json was NOT found at the following location: ' + environmentFilePath);
            grunt.log.ok('Using hardcoded JSON in Gruntfile.js instead!');
        }
        return env;
    }();

    grunt.config(['deploy'], {
        previewstage: {
            server:  env['previewstage']['mount'],
            source:  sourceFiles,
            path:    '/news/special/' + PROJECT_YEAR + '/newsspec_' + PROJECT_NUMBER + '/content',
            replacements: [{
                from: env['local']['domain'],
                to:   env['previewstage']['domain']
            }, {
                from: env['local']['domainStatic'],
                to:   env['previewstage']['domainStatic']
            }],
            beforeDeployment: function (done) {
                if (volumesAreMounted()) {
                    done();
                }
            }
        },
        stage: {
            server:  env['stage']['mount'],
            source:  sourceFiles,
            path:    '/news/special/' + PROJECT_YEAR + '/newsspec_' + PROJECT_NUMBER + '/content',
            replacements: [{
                from: env['local']['domain'],
                to:   env['stage']['domain']
            }, {
                from: env['local']['domainStatic'],
                to:   env['stage']['domainStatic']
            }],
            beforeDeployment: function (done) {
                if (volumesAreMounted()) {
                    done();
                }
            }
        },
        live: {
            server:  env['live']['mount'],
            source:  sourceFiles,
            path:    '/news/special/' + PROJECT_YEAR + '/newsspec_' + PROJECT_NUMBER + '/content',
            replacements: [{
                from: env['local']['domain'],
                to:   env['live']['domain']
            }, {
                from: env['local']['domainStatic'],
                to:   env['live']['domainStatic']
            }],
            beforeDeployment: function (done) {
                if (volumesAreMounted()) {
                    checkDeployedToStage(done);
                }
            }
        }
    });
    
    function volumesAreMounted() {
        var execSync = require('child_process').execSync;
        var stdout = execSync(
            'ls -ls /Volumes | if grep --quiet "tmp"; then echo "Drives appear to be mounted."; else echo "WARNING"; fi',
            {
                encoding: 'utf8'
            }
        );

        if (stdout.match(/WARNING/)) {
            grunt.fail.warn('You need to mount your network drives before you can deploy to other environments.');
            return false;
        }
        return true;
    }

    function checkDeployedToStage(done) {
        var path   = require('path'),
            env    = grunt.config.get('env'),
            config = grunt.file.readJSON('config.json'),
            fs     = require('fs');

        try {
            var stagedProject = fs.lstatSync(env.stage.mount + '/news/special/' + config.year + '/newsspec_' + config.project_number + '/content/' + config.services.default);

            if (stagedProject.isDirectory()) {
                grunt.log.writeln('This content is on stage - OK');
                done();
            }
        } catch (e) {
            grunt.fail.warn('This content has not been staged - Fail');
        }
    }

};
