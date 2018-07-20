const gulp = require('gulp');

const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlMin = require('gulp-htmlmin');

const paths = {
  html: 'public/**/*.html',
  css: 'public/css/**/*.css',
  js: 'public/js/**/*.js',
};

gulp.task('views', () => gulp.src(paths.html)
  .pipe(htmlMin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('dist')));

gulp.task('styles', () => gulp.src(paths.css)
  .pipe(csso())
  .pipe(gulp.dest('dist/css')));

gulp.task('scripts', () => gulp.src(paths.js)
  .pipe(babel({
    presets: ['env'],
  }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js')));

gulp.task('dist', ['styles', 'scripts', 'views']);

gulp.task('default', () => {
  gulp.watch(paths.html, ['views']);
  gulp.watch(paths.css, ['styles']);
  gulp.watch(paths.js, ['scripts']);
});
