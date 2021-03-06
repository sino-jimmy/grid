var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('javascript', function () {
  // 在一个基础的 task 中创建一个 browserify 实例
    browserify({
        entries: './app/app.js',
        standalone: 'cml.App',
        debug: true
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // 在这里将转换任务加入管道
        // .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'));

});
gulp.task('uglify', () => {
    gulp.src('./dist/js/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
})