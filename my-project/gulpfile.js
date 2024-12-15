const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

// Пути к файлам
const paths = {
  styles: {
    src: "src/scss/**/*.scss",
    dest: "dist/css/",
  },
};

// Компиляция Sass
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError)) // Обработка ошибок
    .pipe(gulp.dest(paths.styles.dest));
}

// Наблюдение за изменениями
function watch() {
  gulp.watch(paths.styles.src, styles);
}

// Задачи по умолчанию
exports.styles = styles;
exports.watch = watch;
exports.default = gulp.series(styles, watch);
