var gulp = require('gulp');
var browserify = require('browserify');
var gutil = require('gulp-util');
var tap = require('gulp-tap');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('js', function () {

    return gulp.src('src/js/*.js', {read: false}) // no need of reading file because browserify does.

    // transform file objects using gulp-tap plugin
        .pipe(tap(function (file) {

            gutil.log('bundling ' + file.path);

            // replace file contents with browserify's bundle stream
            file.contents = browserify(file.path, {debug: true})
                .transform("babelify", {presets: ["es2015"]})
                .bundle();

        }))

        // transform streaming contents into buffer contents (because gulp-sourcemaps does not support streaming contents)
        .pipe(buffer())

        // load and init sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))

        .pipe(concat('test.js'))

        .pipe(uglify())

        // write sourcemaps
        .pipe(sourcemaps.write('./'))

        .pipe(gulp.dest('dist'));

});