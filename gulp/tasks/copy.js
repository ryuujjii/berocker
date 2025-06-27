import gulp from "gulp";

const copyFiles = () => {
  return app.gulp
    .src([app.path.src.files])
    .pipe(app.gulp.dest(app.path.build.files));
};

const copyRobot = () => {
  return app.gulp
    .src([`src/robots.txt`])
    .pipe(app.gulp.dest(app.path.buildFolder));
};

export const copy = gulp.parallel(copyFiles, copyRobot);
