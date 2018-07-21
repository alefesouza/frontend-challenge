const gulp = require('gulp');

const csso = require('gulp-csso');
const htmlMin = require('gulp-htmlmin');

const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const paths = {
  html: 'public/**/*.html',
  css: 'public/css/**/*.css',
  js: 'public/js/**/*.js',
  jsTest: 'test/public/js/**/*.js',
  jsEntry: 'public/js/index.js',
};

gulp.task('views', () => gulp.src(paths.html)
  .pipe(htmlMin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest('dist')));

gulp.task('styles', () => gulp.src(paths.css)
  .pipe(csso())
  .pipe(gulp.dest('dist/css')));

gulp.task('scripts', function () {
  const b = browserify({
    entries: paths.jsEntry,
    debug: true,
    detectGlobals: false,
    transform: [babelify.configure({
      presets: ['env'],
      plugins: ['transform-runtime']
    })]
  });

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('dist', ['scripts', 'styles', 'views']);

gulp.task('default', () => {
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(paths.css, ['styles']);
  gulp.watch(paths.html, ['views']);
});
