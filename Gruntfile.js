module.exports = function(grunt) {
	// load all grunt tasks
  	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  	var config = grunt.file.readJSON('settings.json');

  	grunt.initConfig({
  		'jshint': {
		    options: {
		      strict: true,
                    indent: 4,
                    trailing: true,
                    unused: true,
                    // undef: true,
                    latedef: true,
                    immed: true,
                    curly: true,
                    globals: {
                    	jQuery: true
                    }
		    },
		    uses_defaults: ['js/*.js']
		  },
  		'compass': {
	      dev: {
	        options: {
	          config: 'config.rb',
	          force: true
	        }
	      }
	    },
	    'connect': {
            production: {
                options: {
                    port: config.app.port,
                    base: config.app.base,
                    hostname: "0.0.0.0",
                    middleware: function (connect, options) {
                        return [
                            require('connect-livereload')(),
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },
        'open': {
            production: {
                path: 'http://localhost:' + config.app.port + '/' + config.app.docroot + '/' + config.app.index
            }
        },
        'cssmin': {
		  minify: {
		    expand: true,
		    cwd: 'css/',
		    src: ['*.css', '!*.min.css'],
		    dest: 'css/minified/',
		    ext: '.min.css'
		  }
		},
	    'uglify': {
	      build: {
	        src: ['js/*.js','!js/*.min.js'],
	        dest: 'js/min/main.min.js'
	      }
	    },
	    'watch': {
	    	'jshint': {
                files: ['Gruntfile.js', 'js/*.js'],
                tasks: ['jshint']
            },
	      	'sass': {
	        	files: ['sass/**/*.scss'],
	        	tasks: ['compass:dev'],
	        	options: {
	          		livereload: true
	        	}
	      	},
	      	/* watch and see if our javascript files change, or new packages are installed */
	      	'js': {
		        files: ['js/main.js'],
		        tasks: ['uglify'],
		        options: {
		          livereload: true
		        }
	      	},
	      	/* watch our files for change, reload */
	      	'livereload': {
	        	files: ['*.html', 'css/*.css', 'js/{main.min.js, plugins.min.js}'],
	        	options: {
	          		livereload: true
	        	}
	      	}
	    }

	  });
  	grunt.registerTask('default', 'watch');
  	grunt.registerTask('server', [
        'connect',
        'open',
        'watch'
    ]);
}