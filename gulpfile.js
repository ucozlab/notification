'use strict';

const	gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		cleanCSS     = require('gulp-clean-css'),
		autoprefixer = require('gulp-autoprefixer'),
		sourcemaps   = require('gulp-sourcemaps'),
		webserver    = require('gulp-webserver');

gulp.task('compile-scss', function() {
    gulp.src('src/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        // .pipe(cleanCSS({advanced : false}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-scss', function() {
    gulp.watch('src/**/*.scss', ['compile-scss']);
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            fallback: "index.html",
            port: 1080,
            open: true
        }));
});

//Watch task
gulp.task('default', ['webserver', 'compile-scss', 'watch-scss'] );

gulp.task('build', ['compile-scss'] );

