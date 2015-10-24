'use strict';
var gulp = require('gulp');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
gulp.task('jade', function() {
    //var YOUR_LOCALS = {};

    return gulp.src(['src/jade/**/*.jade',"!src/jade/**/_*.jade"])
        //.pipe(data( function(file) {
        //    return requireUncached('./dist/result.json');
        //} ))
        .pipe(jade({
            //locals: YOUR_LOCALS
        }).on('error', log))
        .pipe(gulp.dest('dist/'));
});

function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}
gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: "dist"
        },
        files: ["dist/index.html", "dist/**/*.css", "dist/js/**/*.js"],
        port: 8000,
        host: "0.0.0.0"
    });
});
gulp.task('copyjs', function(){
    return  gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch',['jade', 'sass', 'copyjs'], function(){
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch(['src/jade/**/*.jade', 'src/jade/**/*.json'], ['jade']);
    gulp.watch(['src/js/**/*.js'], ['copyjs']);
    gulp.run('webserver');
});

gulp.task('sass', function () {
    return gulp.src(['src/scss/**/*.scss', '!src/scss/**/_*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('default', ['watch']);