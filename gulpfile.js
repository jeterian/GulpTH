'use strict';

// Variables/Dependencies
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	del = require('del');

var options = {
	src: 'src',
	dist: 'dist',
	dep: 'dep'
}

//Scripts - concatenate, minify & copy JS files, generate source maps
gulp.task('scripts', function() {


});



// Styles - compile SCSS to CSS, concatenate & minify & copy, 
// generate source maps
gulp.task('styles', function() {

});

// Images - optimze the size of JPEGs and PNGs, copy
gulp.task('images', function() {

});

// Clean - delete all files/folders in Dist folder
gulp.task('clean', function() {

});

// Build - runs clean, scripts, styles & images (clean first)
gulp.task('build', function() {

});

// Default - runs build
gulp.task('default', function() {

});

// Serve - build and serves project using local web server
gulp.task('serve', function() {

});

// Watch - scripts runs, current page reloaded in browser if change to JS