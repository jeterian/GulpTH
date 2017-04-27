'use strict';

// Variables/Dependencies
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	del = require('del');

//Scripts - concatenate, minify & copy JS files, generate source maps


// Styles - compile SCSS to CSS, concatenate & minify & copy, 
// generate source maps


// Images - optimze the size of JPEGs and PNGs, copy


// Clean - delete all files/folders in Dist folder


// Build - runs clean, scripts, styles & images (clean first)


// Default - runs build


// Serve - build and serves project using local web server


// Watch - scripts runs, current page reloaded in browser if change to JS