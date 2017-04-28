'use strict';

// Variables/Dependencies
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	maps = require('gulp-sourcemaps'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	sync = require('browser-sync'),
	livereload = require('gulp-livereload');

var options = {
	src: 'src',
	dist: 'dist',
	dep: 'dep'
}

//Scripts - concatenate, minify & copy JS files, generate source maps
gulp.task('scripts', function() {
	return gulp.src(['js/**/*.js'])
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(maps.init())
		.pipe(maps.write('.'))
		.pipe(gulp.dest('dist/scripts'))
});

// Styles - compile SCSS to CSS, concatenate & minify & copy, 
// generate source maps
gulp.task('styles', function() {
	return gulp.src('sass/global.scss')
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(rename('all.min.css'))
	.pipe(maps.init())
	.pipe(maps.write('.'))
	.pipe(gulp.dest('dist/styles'));
});

// Images - optimze the size of JPEGs and PNGs, copy
gulp.task('images', function(){
    return gulp.src('./images/*.{jpg,png}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/content/'))
});
// Clean - delete all files/folders in Dist folder
gulp.task('clean', function() {
	return del('dist');
});

// Build - runs clean, scripts, styles & images (clean first)
gulp.task('organize', function() {
	gulp.src(['index.html', 'icons/**'], {base: '.'})
		.pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function() {
	return gulp.start('scripts', 'styles', 'images', 'organize');
});

// Default - runs build
gulp.task('default', ['build']);

// Serve - build and serves project using local web server
gulp.task('serve', ['build'], function() {
	sync({
		server: {
			baseDir: 'dist'
		}
	});
});

// Watch - scripts runs, current page reloaded in browser if change to JS
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['js/*/*.js','js/*.js'],['scripts']);
});
