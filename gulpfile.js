var gulp = require('gulp');
var babel = require('gulp-babel');
var sourcemaps = require("gulp-sourcemaps");

gulp.task('js', function() {
	return gulp.src('src/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			modules: 'ignore'
		}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('dist'));
});

gulp.task('tests', function() {
	return gulp.src('src/tests/*js')
		.pipe(babel({
			modules: 'ignore',
			moduleId: 'Test'
		}))
		.pipe(gulp.dest('dist/tests'));
});

gulp.task('watch', function() {
	gulp.watch('src/*.js', ['js']);
	gulp.watch('src/tests/**/*.js', ['tests']);
});



gulp.task('default', ['js', 'watch', 'tests']);