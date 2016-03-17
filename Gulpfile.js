var gulp    = require('gulp'),
    pkg     = require('./package.json'),
    del     = require('del'),
    inject  = require('gulp-inject'),
    series  = require('stream-series')
  ;

var npmSources = [
  'node_modules/angular-material/angular-material.css',
  'node_modules/angular/angular.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-aria/angular-aria.js',
  'node_modules/angular-material/angular-material.js',
  'node_modules/angular-ui-router/release/angular-ui-router.js',
  'node_modules/angular-simple-logger/dist/angular-simple-logger.js',
  'node_modules/angular-google-maps/dist/angular-google-maps.js',
  'node_modules/angularjs-color-picker/dist/angularjs-color-picker.min.js',
  'node_modules/angularjs-color-picker/dist/angularjs-color-picker.min.css',
  'node_modules/angularjs-color-picker/node_modules/tinycolor2/dist/tinycolor-min.js',
  'node_modules/textangular/dist/textAngular-rangy.min.js',
  'node_modules/textangular/dist/textAngular-sanitize.min.js',
  'node_modules/textangular/dist/textAngular.min.js',
  'node_modules/textangular/dist/textAngular.css',
  'node_modules/font-awesome/css/font-awesome.css'
];


/**
 * Inject app dependencies into build/index.html file
 */
gulp.task('index', function() {

  var appStream = gulp.src([
      './app/assets/app.css',
      './app/src/**/*.module.js',
      './app/src/**/*.service.js',
      './app/src/**/*.controller.js'

    ], {base: './app'});

  var npmStream = gulp.src(npmSources);

  return gulp.src('./app/index.html')
    .pipe(inject(series(npmStream, appStream), { ignorePath: 'app', addRootSlash: false }))
    .pipe(gulp.dest('./build/'));

});


/**
  This task copies the files to the build folder
**/

gulp.task('copy', ['clean'], function() {
  var stream = gulp.src([
    './app/**/*'
  ], {base: './app'})
    .pipe(gulp.dest('./build'));

  gulp
    .src(npmSources, {base: 'node_modules'})
    .pipe(gulp.dest('./build/node_modules'));
  gulp
    .src(['./node_modules/font-awesome/fonts/**'], {base: 'node_modules'})
    .pipe(gulp.dest('./build/node_modules'));

  return stream;

});

/**
 * This task cleans out the old build.
 * **/
gulp.task('clean', function() {
  return del(['./build']);
});


gulp.task('build', ['copy', 'index']);