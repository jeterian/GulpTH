
// add npm and gulp modules required for project
var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var maps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var del = require('del');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var rename = require('gulp-rename');
var webserver = require('gulp-webserver');


//The sripts command concatenates, minifies, generates source map and copies all of the project’s JavaScript files into an all.min.js file
gulp.task('scripts', function() {
    return gulp.src(['js/*.js', 'js/**/*.js'])
        .pipe(maps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/scripts'));
});


//The compileSass command compiles the project’s SCSS files into CSS, generates source map and concatenates the css files into the global.css file
gulp.task('compileSass', ['scripts'], function() {
	return gulp.src(['sass/global.scss'])
    .pipe(maps.init())
	.pipe(sass())
    .pipe(maps.write('./'))
	.pipe(gulp.dest('css'));
});

// The styles command minifies and copies the all.min.css file into the dist/styles folder
gulp.task('styles', ['compileSass'], function() {
	return gulp.src(['css/global.css'])
    .pipe(concat('all.min.css'))
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'));
});


// The gulp images command decreases the size of the project’s JPEG and PNG files.
gulp.task('images', ['styles'], function() {
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'));
});

// The gulp clean command deletes all of the files and folders in the “dist” folder, it also gets rid of any javascript and css used in development
gulp.task('clean', function() {
  return del(['dist/**/*', 'css', 'js/global.js*']);
});



// The gulp serve command builds and serves the project using a local web server.
gulp.task('serve', ['build', 'watch'], function() {
    gulp.src('./')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: true,
            open: true
        }));
});


// When running the gulp serve command, the scripts task is run and the current page is reloaded in the browser when a change is made to any JavaScript (*.js) file.
gulp.task('watch', function() {
    gulp.watch('js/**/*', ['scripts']);
});

// The gulp build command properly runs the clean, scripts, styles, and images tasks. The clean task fully completes before the scripts, styles, and images tasks are ran.
gulp.task('build', ['clean'], function() {
    gulp.start(['images']);
});

// The gulp command properly runs the build task as a dependency.
gulp.task('default', ['build']);