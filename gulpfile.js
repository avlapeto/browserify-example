'use strict;'

var gulp = require('gulp');
var glob = require('glob');
var browserify  = require('browserify');
var source = require('vinyl-source-stream');
var hbsfy = require("hbsfy").configure({
    extensions: ["hbs"]
});

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
        .pipe(gulp.dest('dist'));
});