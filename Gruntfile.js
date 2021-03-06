// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),
        // Files to watch for changes
        watch: {
            // CSS Assets
            style: {
                files: [
                    'assets/src/less/libs/bootstrap-3.3.7/less/*.less',
                    'assets/src/less/theme/**/*.less',
                    'assets/src/less/theme/*.less'
                ],
                tasks: [
                    'less:style'
                ]
            },
            // JS Assets
            js: {
                files: [
                    'assets/src/js/*.js',
                    'assets/src/js/**/*.js'
                ],
                tasks: [
                    'uglify:build_head',
                    'uglify:build_foot'
                ]
            },
            livereload: {
                files: ['*.html', '*.php', 'js/**/*.{js,json}', 'less/*.css', 'img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
                options: {
                    livereload: true
                }
            }
        },
        // CSS Assets Tasks
        less: {
            style: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'assets/build/css/app.less.map',
                    sourceMapURL: 'app.less.map',
                    // base path for the path set in the map file
                    sourceMapBasepath: 'assets',
                    // root path for the path set in the map file which will be used with base path
                    sourceMapRootpath: '/'
                },
                files: {
                    'assets/build/css/app.css': 'assets/src/less/theme/app.less'
                }
            }
        },
        uglify: {
            build_head: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'assets/build/js/app_head.min.js.map',
                    sourceMapURL: 'app_head.min.js.map',
                    sourceMapBasepath: 'assets',
                    sourceMapRootpath: '/'
                },
                src: [
                    // Include js libs
                    // Modernizr must be loaded in the head before the DOM is loaded for the HTML5 shiv to work correctly
                    'assets/src/js/libs/modernizr-custom.js',
                ],
                dest: 'assets/build/js/app_head.min.js',
            },
            build_foot: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'assets/build/js/app_foot.min.js.map',
                    sourceMapURL: 'app_foot.min.js.map',
                    sourceMapBasepath: 'assets',
                    sourceMapRootpath: '/'
                },
                src: [
                    // Include js libs
                    'assets/src/js/libs/jquery/jquery-3.1.1.min.js',
                    'assets/src/js/libs/moment.js',
                    'assets/src/js/libs/charts.min.js',

                    // Bootstrap files
                    'assets/src/js/libs/bootstrap-3.3.7/js/dropdown.js',
                    'assets/src/js/libs/bootstrap-3.3.7/js/collapse.js',

                    //theme files
                    'assets/src/js/theme/accordion.js',
                    'assets/src/js/theme/list.js',
                    'assets/src/js/theme/dashboard.js'
                ],
                dest: 'assets/build/js/app_foot.min.js',
            },
        }

    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'uglify', 'watch']);

};