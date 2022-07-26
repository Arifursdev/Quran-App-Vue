const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const uglifycss = require('gulp-uglifycss')
const uglify = require('gulp-uglify')
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');


/** 
 * SASS 
 */
var sass_files = [
    './dev/scss/*.scss',
    '!./dev/scss/site.min.scss'
];
gulp.task('sass', function () {
    return gulp.src(sass_files)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer({grid: true}))
      .pipe(uglifycss())
      .pipe(gulp.dest('./assets/css'));
});

/** 
 * Watch and Run
*/

gulp.task('watch', function(){
    gulp.watch(['./dev/scss/**/*.scss'], gulp.series(['sass']))
})
