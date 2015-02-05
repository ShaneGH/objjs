module.exports = function(grunt) {

    var concatFile =  'build/<%= pkg.name %>.debug.js';
    var banner =  '// <%= pkg.name %> v<%= pkg.version %>\n// (c) <%= pkg.author %> <%= grunt.template.today("yyyy") %>\n// http://www.opensource.org/licenses/mit-license.php\n';
    
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
                dest: concatFile,
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
                src: concatFile,
                dest: 'build/<%= pkg.name %>.js'
            }
        },
        
        qunit: {
            files: ['test/**/*.html']
        },
        
        watch: {
            files: ['<%= concat.dist.src %>'],
            tasks: ['default']
        }
    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Default task(s).
    grunt.registerTask('default', ['concat', 'uglify', 'qunit']);

};