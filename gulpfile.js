var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');

gulp.task('default', ['html', 'templates', 'js', 'css']);

gulp.task('html', function () {
    return gulp.src('./*.html')
        .pipe(gulp.dest('./public'));
});

gulp.task('templates', function () {
    return gulp.src('./templates/*.html')
        .pipe(gulp.dest('./public/templates'));
});

gulp.task('css', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function () {
    return gulp.src('./js/app.js')
        .pipe(browserify())
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function () {
    gulp.watch('./*.html', ['html']);
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
});
