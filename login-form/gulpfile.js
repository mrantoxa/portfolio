import gulp from "gulp";
import gulp_sass from "gulp-sass";
import sass_node from "sass";
import pug from "gulp-pug";
import rename from "gulp-rename";
import debug from "gulp-debug";
import browser_sync from "browser-sync";
import concat from "gulp-concat";
import autoprefixer from "gulp-autoprefixer";
import cleancss from "gulp-clean-css";
import gulp_uglify from "gulp-uglify-es";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";
import webp from "gulp-webp";

const root_dir = "app"; // откуда
const out_dir = "dist"; //куда будет компилиться
const browserSync = browser_sync.create();

const sass = gulp_sass(sass_node);
gulp.task("sass", () => {
  return gulp
    .src(`${root_dir}/scss/**/*.scss`)
    .pipe(sass().on("error", sass.logError)) //если budet oshibka pokazet ee
    .pipe(concat("app.min.css")) // Конкатенируем в файл app.min.js
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    ) // Создадим префиксы с помощью Autoprefixer
    .pipe(
      cleancss({
        level: { 1: { specialComments: 0 } } /* , format: 'beautify' */,
      })
    ) // Минифицируем стили
    .pipe(gulp.dest(`${out_dir}/css/`)) //skompilrovan faily v css budut suda socraniansya
    .pipe(browserSync.stream());
});

gulp.task("pug", () => {
  return gulp
    .src(`${root_dir}/views/**/*.build.pug`)
    .pipe(
      pug({
        client: false,
        pretty: true,
      })
    )
    .pipe(
      rename((path) => {
        path.basename = path.basename.slice(0, path.basename.indexOf("."));
        path.extname = ".html";
      })
    )
    .pipe(debug({ title: "pug" }))
    .pipe(gulp.dest(`${out_dir}/`))
    .pipe(browserSync.stream());
});

const uglify = gulp_uglify.default;

gulp.task("scripts", () => {
  return gulp
    .src(`${root_dir}/js/**/*.js`)
    .pipe(concat("app.min.js"))
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(gulp.dest(`${out_dir}/js/`)) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()); // Триггерим Browsersync для обновления страницы
});

gulp.task("imagemin", () =>
  gulp
    .src(`${root_dir}/images/*`)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        optimizationLevel: 5,
        use: [pngquant()],
      })
    )
    .pipe(webp())
    .pipe(debug({ title: "imagemin" }))
    .pipe(gulp.dest(`${out_dir}/images/`))
);

gulp.task("fonts", () =>
  gulp.src(`${root_dir}/fonts/**/*`).pipe(gulp.dest(`${out_dir}/fonts/`))
);

gulp.task("pug-watch", gulp.series("pug"), (done) => {
  browserSync.reload();
  done();
});

gulp.task("sass-watch", gulp.series("sass"), (done) => {
  browserSync.reload();
  done();
});

gulp.task("watch", () => {
  browserSync.init({
    server: { baseDir: out_dir },
  });

  gulp.watch(`${root_dir}/scss/**/*.scss`, gulp.series("sass-watch")); //dobavit html js img
  gulp.watch(`${root_dir}/views/**/*.pug`, gulp.series("pug-watch"));
  gulp.watch(`${root_dir}/js/**/*.js`, gulp.series("scripts"));
  gulp.watch(`${root_dir}/images/`, gulp.series("imagemin"));
  gulp.watch(`${root_dir}/fonts/**/*`, gulp.series("fonts"));
});

gulp.task("build", gulp.series("sass", "pug", "scripts", "imagemin", "fonts"));
gulp.task("default", gulp.series("build", "watch"));
