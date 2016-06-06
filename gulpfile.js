var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    liveReload  = require('gulp-livereload'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    rename      = require('gulp-rename');

var libs = [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
    ];


gulp.task('dist-js', function() {
    gulp.src(libs.concat('js/app.js'))
        .pipe(concat('app'))
        .pipe(uglify())
        .pipe(rename({
            extname: ".min.js"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(liveReload({
            auto: false
        }));
});

gulp.task('watch', function() {
    liveReload.listen();
    watch('js/**/*.js', function() {
        gulp.start('dist-js');
    });

    watch('templates/**/*.html').pipe(liveReload({
        auto: false
    }));
});

gulp.task('default', ['dist-js', 'watch']);