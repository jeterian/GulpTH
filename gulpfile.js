'use strict';

// Dependencies and Variables
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	useref = require('gulp-useref'),
	rename = require('gulp-rename'),
	webserver = require('gulp-webserver'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	sync = require('browser-sync'),
	del = require('del');

// Scripts - concatenate, minify, create sourcemaps, copies files
gulp.task('scripts', function() {
	return gulp.src(['js/*.js', 'js/**/*.js'])
		.pipe(maps.init())
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('dist/scripts'))
});

// Styles - compiles Sass into CSS, minifies, copies, etc files
gulp.task('compile', ['scripts'], function() {
	return gulp.src(['sass/global.scss'])
		.pipe(maps.init())
		.pipe(sass())
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'));
});

gulp.task('styles', ['compile'], function() {
	return gulp.src(['css/global.css'])
		.pipe(concat('all.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'));
});

// Images - optimize size of JPGs and PNGs
gulp.task('images', ['styles'], function() {
	gulp.src('images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/content'));
});

// Clean - deletes the Dist folder, along with all files in it
gulp.task('clean', function() {
	return del(['dist', 'css']);
});

// Build - Runs styles, images, scripts after clean
gulp.task('build', ['clean'], function() {
	gulp.start(['images']);
});

// Watch - watches the JS files for changes and updates as necessary
gulp.task('watch', function() {
	gulp.watch('js/**/*', ['scripts']);
});

// Serve - builds and serves the project
gulp.task('serve', ['build', 'watch'], function() {
	gulp.src('./')
		.pipe(webserver({
			fallback: 'index.html',
			livereload: true,
			open: true
		}));
});

// Default - runs the build task 
gulp.task('default', ['build']);