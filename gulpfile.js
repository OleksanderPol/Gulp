const gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify'),
      concat = require('gulp-concat'),
      watch = require('gulp-watch'),
      uglifycss = require('gulp-uglifycss'),
      serve = require('gulp-serve'),
      localtunnel = require('localtunnel');

gulp.task('static', serve({
  root: './dist',
  port: 8080
}));

gulp.task('tunnel', function() {
  localtunnel(8080, function(err, tunnel) {
    console.log('Below is a project URL:\n' + 
      tunnel.url.replace(/^https/, 'http'));
  });
});

gulp.task('css', function() {
  return gulp.src('dev/styles/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('cssMin', function() {
  return gulp.src('dist/styles/styles.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('js', function() {
  return gulp.src('dev/scripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('jsMin', function() {
  return gulp.src('dev/scripts/*.js')
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('watch', function () {
   gulp.watch('dev/**/*.scss', ['css']);
   gulp.watch('dev/**/*.js', ['js']);
});

gulp.task('build', ['css', 'js', 'jsMin', 'cssMin']);
gulp.task('serve', ['static', 'tunnel', 'watch']);
