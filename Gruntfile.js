module.exports = function(grunt) {

    var debugFile =  'build/<%= pkg.name %>.debug.js',
        minFile = 'build/<%= pkg.name %>.js',
        banner =  '// <%= pkg.name %> v<%= pkg.version %>\n// (c) <%= pkg.author %> <%= grunt.template.today("yyyy") %>\n// http://www.opensource.org/licenses/mit-license.php\n';
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        concat: {
            options: {
                separator: '\n\n',
                banner: banner
            },
            dist: {
                src: ['tools/begin.js', 'src/**/*.js', 'tools/end.js'],
                dest: debugFile,
            },
        },
        
        uglify: {
            options: {
                banner: banner,
                mangle: {
                    except: ["objjs"]
                }
            },
            build: {
                src: debugFile,
                dest: minFile
            }
        },
        
        qunit: {
            files: ['test/**/*.html']
        },
        
        watch: {
            files: ['<%= concat.dist.src %>'],
            tasks: ['default']
        },
        
        copy: {
            release: {
                files: [{
                    src: debugFile, 
                    dest: 'release/<%= pkg.name %>-<%= pkg.version %>.debug.js'
                }, {
                    src: minFile, 
                    dest: 'release/<%= pkg.name %>-<%= pkg.version %>.js'
                }],
            }
        }
    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'qunit']);
    grunt.registerTask('release', ['default', 'copy:release']);

};