// Include gulp
const gulp = require('gulp');

// Include plugins
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// Compile SCSS to CSS with sourcemaps
gulp.task('sass', function () {
  return gulp.src('src/scss/not-another-css-framework.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

// Minify CSS with sourcemaps
gulp.task('minify-css', function () {
  return gulp.src('dist/css/not-another-css-framework.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'));
});

// Watch for changes
gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.series('sass', 'minify-css'));
});

// Default task
gulp.task('default', gulp.series('sass', 'minify-css', 'watch'));