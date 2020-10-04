let gulp = require('gulp'), 
    sass = require('gulp-sass'),
    browser = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', async function(){
    del.sync('dist');
});

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(autoprefixer({
        overrideBrowserslist:['last 8 versions']
    }))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browser.reload({stream:true}))
});

gulp.task('css', function(){
    return gulp.src([
        "node_modules/normalize.css/normalize.css"
        ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browser.reload({stream:true}))
});

gulp.task('export', function(){
    let buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'));
    let buildCss = gulp.src('app/css/*.css')
    .pipe(gulp.dest('dist/css'));
    let buildJs = gulp.src('app/js/*.js')
    .pipe(gulp.dest('dist/js'));
    let buildFonts = gulp.src('app/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'));
    let buildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('js', function(){
    return gulp.src([
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js')) 
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

gulp.task('build', gulp.series('clean', 'export'));

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

gulp.task('default', gulp.parallel('css','script','scss','browser-sync', 'watch'));
