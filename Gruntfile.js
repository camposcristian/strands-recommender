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
			html: {
				files: ['/web/*.html'],
			},
			js: {
				files: ['/web/js/*.js'],
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