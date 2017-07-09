'use strict;'

var gulp = require('gulp');
var glob = require('glob');
var browserify  = require('browserify');
var source = require('vinyl-source-stream');
var hbsfy = require("hbsfy").configure({
    extensions: ["hbs"]
});
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');



gulp.task('tests', function(){
    var testFiles = glob.sync('./src/js/*.js');
    console.log(testFiles);
    return browserify({
        entries: testFiles,
        debug: true,
        transform: [hbsfy]
    })
        // .transform(hbsfy)
        .transform(["babelify", {presets: ["es2015"], sourceMapsAbsolute: true, extensions: [".js"]}])
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())

        // load and init sourcemaps
        .pipe(sourcemaps.init({loadMaps: true}))

        .pipe(uglify())

        // write sourcemaps
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'));
});

// See also https://www.npmjs.com/package/sass-css-stream