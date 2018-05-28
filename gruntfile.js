module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        },
        qunit: {
            all: {
                options: {
                    urls: [
                        'http://localhost:8000/tests/index.html'
                    ]
                }
            }
        },
        rsids_pa11y: { // Accessibility test ~ see http://pa11y.org/
            accessibility: {
                options: { // Task-specific options go here.
                    standard: 'WCAG2AA',
                    timeout: 8000,
                    wait: 1000
                },
                url: [
                    'http://localhost:8000/tests/pa11y.html'
                ]
                //, file: [ 'array of files, globbing permitted' ]
            }
        },
        strip_code: {

            src: {
                src: 'src/cookie.notice.js',
                dest: 'dist/cookie.notice.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'gzip',
                screwIE8: true
            },
            build: {
                src: 'dist/cookie.notice.js',
                dest: 'dist/cookie.notice.min.js'
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-strip-code');
    grunt.loadNpmTasks('grunt-rsids-pa11y');

    // Default task(s).
    grunt.registerTask('default', ['connect', 'qunit', 'strip_code', 'uglify']);

    grunt.registerTask('pa11y', [ 'connect', 'rsids_pa11y' ]);

};
