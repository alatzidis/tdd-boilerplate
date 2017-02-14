
import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import babel from 'gulp-babel'
import eslint from 'gulp-eslint'
import run from 'gulp-run'

gulp.task('test', () =>
  run('npm test').exec())

gulp.task('eslint', () =>
  gulp.src([
    './source/**/*.js',
    './test/*.js',
    '!build/**',
    '!coverage/**',
    '!node_modules/**',
    ]).pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError()))

gulp.task('es6', () =>
  gulp.src('./source/**/*.js')
    .pipe(babel({
      ignore: 'gulpfile.babel.js'
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulp.dest('./build')))

gulp.task('watch', () => gulp.watch(['./source/**/*.js', './test/*.js'], ['eslint', 'es6', 'test']))

gulp.task('dev', ['watch'])

gulp.task('default', ['dev'])
