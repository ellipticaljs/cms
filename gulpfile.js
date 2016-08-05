var gulp=require('gulp'),
    concat=require('gulp-concat'),
    BUILD_JSON=require('./build.json'),
    BUILD_NAME='elliptical.page.js',
    babel=require('gulp-babel'),
    REPO_NAME='elliptical-page',
    DIST='./dist';


gulp.task('default',function(){
    console.log(REPO_NAME + ' ..."tasks: gulp build"');
});

gulp.task('build',function(){
    gulp.src(BUILD_JSON)
      .pipe(babel())
      .pipe(concat(BUILD_NAME))
      .pipe(gulp.dest(DIST));
});

