module.exports = function(grunt) {
	var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

	grunt.initConfig({
		connect: {
			options: {
				port: 8000,
				// keepalive: true,
			},
			rules: [{
				from: 'http://bizsolutions.strands.com/sbsstatic/wids/[A-Za-z0-9]+/SBScojo.js',
				to: 'http://bizsolutions.strands.com/cojo/SBScojo.js'
			}],
			server: {
				options: {
					livereload: true,
					base: 'web/',
					port: 9009,
					open: true,
				}
			},
			development: {
				options: {
					middleware: function(connect, options) {
						var middlewares = [];

						// RewriteRules support 
						middlewares.push(rewriteRulesSnippet);

						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}
						var directory = options.directory || options.base[options.base.length - 1];
						options.base.forEach(function(base) {
							// Serve static files. 
							middlewares.push(connect.static(base));
						});
						return middlewares;
					},
				},
			}
		},
		watch: {
			files: ['web/*.html', 'web/js/*.js', 'web/css/*.css'],
			options: {
				livereload: true
			}
		},
		concat: {
			dist: {
				src: ['cojo/SBScojoRemote.js', 'cojo/SBScojoXtras.js'],
				dest: 'cojo/SBScojo.js',
			}
		},
		curl: {
			//TODO Reemplazar por el apiid de https://www.npmjs.com/package/grunt-curl/access
			'cojo/SBScojoRemote.js': 'http://bizsolutions.strands.com/sbsstatic/wids/' + grunt.option('apikey') + '/SBScojo.js',
		},
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-connect-rewrite');
	grunt.loadNpmTasks('grunt-file-append');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-curl');

	grunt.registerTask('proxy', function() {
		grunt.task.run([
			'curl',
			'concat',
			'configureRewriteRules',
			'connect:development',
			'connect:server',
			'watch'
		]);
	});
	grunt.registerTask('server', [
		'configureRewriteRules',
		'connect:development'
	]);

	grunt.registerTask('serve', [
		'connect:server',
		'watch'
	]);
};