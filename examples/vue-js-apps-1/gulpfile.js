const gulp = require("gulp");
const tslint = require("gulp-tslint");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = ts.createProject("server/tsconfig.json");
const runSequence = require('run-sequence');

gulp.task("lint", function () {
  return gulp.src("server/**/*.ts").pipe(tslint({}))
    .pipe(tslint.report({
      summarizeFailureOutput: true
    }));
});

gulp.task('clean', function () {
  return gulp.src('server/dist/*', {
      read: false
    })
    .pipe(clean());
});

gulp.task('copy', function () {
  return gulp.src(
      ["server/boot.js", "server/views/*.pug"], {
        base: "server"
      }
    )
    .pipe(gulp.dest('server/dist'));
});

gulp.task('ts', function () {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .js
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("server/dist"));
});

gulp.task('default', function () {
  return runSequence(
    "clean", "copy", "ts"
  );
});

gulp.task('watch', function () {
  var targets = [
    './server/**/*.*',
  ];
  gulp.watch(targets, ["default"]);
});