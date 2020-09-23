let gulp = require('gulp'), 
    sass = require('gulp-sass'),
    browser = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browser.reload({stream:true}))
});

gulp.task('js', function(){
    return gulp.src([
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app.js')) 
    .pipe(browser.reload({stream:true}))
});

gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browser.reload({stream:true}))
});

gulp.task('script', function(){
    return gulp.src('app/js/*js.')
    .pipe(browser.reload({stream:true}))
});


gulp.task('browser-sync', function(){
    browser.init({
        server:{
            baseDir:"app/"
        }
    })
});

gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
   gulp.watch('app/js/*.js', gulp.parallel('script'));
    gulp.watch('app/*.html', gulp.parallel('html'));
});

gulp.task('default', gulp.parallel('script','scss','js','browser-sync', 'watch'));