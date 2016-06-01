var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
	return gulp.src('scss/**/*.scss')
		.pipe(sass()) // converts sass to css with gulp-sass
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('watch', ['browserSync'], function() {
	gulp.watch('css/**/*.css', browserSync.reload);
	gulp.watch('**/*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);

});


gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		},
		port: 8791,
		browser: "google chrome"
	})
});

gulp.task('useref', function() {
	return gulp.src('*.html')
		.pipe(useref())
		// minifies only if it's a javascript file
		.pipe(gulpIf('*.js', uglify()))
		// minifies only if it's a css file
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'))
});

gulp.task('clean:dist', function() {
	return del.sync('dist');
});

gulp.task('build', function(callback) {
	runSequence('clean:dist', ['sass', 'useref'], callback);
});

gulp.task('default', function(callback) {
	runSequence(['sass', 'browserSync', 'watch'], callback);
})