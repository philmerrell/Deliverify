var gulp    = require('gulp'),
    pkg     = require('./package.json'),
    del     = require('del'),
    inject  = require('gulp-inject')
  ;

var dependencies = [

];



/**
 * Inject app dependencies into build/index.html file
 */
gulp.task('index', function() {
  var target = gulp.src('./app/index.html');
  var files = [].concat(
    'node_modules/angular/angular.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-aria/angular-aria.js',
    'node_modules/angular-material/angular-material.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'node_modules/lodash/lodash.js',
    './app/src/**/*.module.js',
    './app/src/**/*.controller.js'
  );

  var sources = gulp.src(files);

  // inject the files, and copy it to the build directory
  return target
    .pipe(inject(sources, { ignorePath: 'app', addRootSlash: false }))
    .pipe(gulp.dest('./build'));
});



/**
  This task copies the files to the build folder
**/

gulp.task('copy', ['clean'], function() {
  var stream = gulp.src([
    './app/**/*'
  ], {base: './app'})
    .pipe(gulp.dest('./build'));

  gulp.src([
    'node_modules/angular/angular.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-aria/angular-aria.js',
    'node_modules/angular-material/angular-material.js',
    'node_modules/angular-ui-router/release/angular-ui-router.js',
    'node_modules/lodash/lodash.js'
  ]).pipe(gulp.dest('./build/node_modules'));

  return stream;

});

/**
 * This task cleans out the old build.
 * **/
gulp.task('clean', function() {
  return del(['./build']);
});


gulp.task('build', ['copy', 'index']);