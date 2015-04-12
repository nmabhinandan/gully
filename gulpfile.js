var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");

gulp.task('js', function() {
	gulp.src('src/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			modules: 'amd'
		}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('src/*.js', ['js']);
});

gulp.task('default', ['js', 'watch']);