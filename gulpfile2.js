'use strict';

// Variables/Dependencies

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-sass'),
	maps = require('gulp=-sourcemaps'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	image = require('gulp-image'),
	eslint = require('gulp-eslint'),
	del = require('del');

//Scripts - concatenate, minify & copy JS files, generate source maps
gulp.task('scripts', function() {
	return gulp.src('js/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(esling.failAfterError())
		.pipe(maps.init())
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(maps.write('.'))
		.pipe(gulp.dest('dist/scripts'));
});