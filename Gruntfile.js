module.exports = function(grunt) {
	grunt.initConfig({
		connect: {
			server: {
				options: {
					livereload: true,
					base: 'web/',
					port: 9009
				}
			}
		},
		watch: {
			files: ['web/*.html', 'web/js/*.js', 'web/css/*.css'],
			options: {
				livereload: true
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('serve', [
		'connect:server',
		'watch'
	]);
};