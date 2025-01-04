// Импорты необходимых пакетов
import gulp from "gulp"; // Основной пакет Gulp
import gulp_sass from "gulp-sass"; // Компиляция SASS/SCSS
import sass_node from "sass"; // Node Sass компилятор
import pug from "gulp-pug"; // Компиляция Pug в HTML
import rename from "gulp-rename"; // Переименование файлов
import debug from "gulp-debug"; // Отладка процесса сборки
import browser_sync from "browser-sync"; // Локальный сервер и live reload
import concat from "gulp-concat"; // Объединение файлов
import autoprefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import cleancss from "gulp-clean-css"; // Минификация CSS
import gulp_uglify from "gulp-uglify-es"; // Минификация JavaScript
import imagemin from "gulp-imagemin"; // Оптимизация изображений
import pngquant from "imagemin-pngquant"; // Оптимизация PNG
import webp from "gulp-webp"; // Конвертация в WebP
import merge from "merge-stream"; // Объединение потоков

// Определение путей
const root_dir = "app"; // Исходная директория
const out_dir = "dist"; // Директория сборки
const browserSync = browser_sync.create(); // Создание экземпляра browserSync

// Настройка SASS
const sass = gulp_sass(sass_node);

// Компиляция SASS/SCSS
gulp.task("sass", () => {
  return gulp
    .src(`${root_dir}/scss/**/*.scss`) // Берем все SCSS файлы
    .pipe(sass().on("error", sass.logError)) // Компилируем SCSS в CSS
    .pipe(concat("app.min.css")) // Объединяем в один файл
    .pipe(
      autoprefixer({ overrideBrowserslist: ["last 10 versions"], grid: true })
    ) // Добавляем префиксы
    .pipe(
      cleancss({
        level: { 1: { specialComments: 0 } },
      })
    ) // Минифицируем CSS
    .pipe(gulp.dest(`${out_dir}/css/`)) // Выгружаем в папку dist/css
    .pipe(browserSync.stream()); // Обновляем браузер
});

// Компиляция Pug
gulp.task("pug", () => {
  return gulp
    .src(`${root_dir}/views/**/*.build.pug`) // Берем все Pug файлы с .build
    .pipe(
      pug({
        client: false,
        pretty: true, // Форматированный HTML
      })
    )
    .pipe(
      rename((path) => {
        // Убираем .build из имени файла
        path.basename = path.basename.slice(0, path.basename.indexOf("."));
        path.extname = ".html";
      })
    )
    .pipe(debug({ title: "pug" }))
    .pipe(gulp.dest(`${out_dir}/`)) // Выгружаем в папку dist
    .pipe(browserSync.stream());
});

const uglify = gulp_uglify.default;

// Обработка JavaScript
gulp.task("scripts", () => {
  return gulp
    .src(`${root_dir}/js/**/*.js`) // Берем все JS файлы
    .pipe(concat("app.min.js")) // Объединяем в один файл
    .pipe(uglify()) // Минифицируем
    .pipe(gulp.dest(`${out_dir}/js/`)) // Выгружаем в папку dist/js
    .pipe(browserSync.stream());
});

// Оптимизация изображений
gulp.task("imagemin", () => {
  // Создаем поток для WebP
  const webpStream = gulp
    .src(`${root_dir}/images/*`)
    .pipe(
      imagemin({
        progressive: true, // Прогрессивная загрузка для JPEG
        svgoPlugins: [{ removeViewBox: false }], // Настройки для SVG
        optimizationLevel: 5, // Уровень оптимизации
        use: [pngquant()], // Оптимизация PNG
      })
    )
    .pipe(webp()) // Конвертируем в WebP
    .pipe(debug({ title: "imagemin:webp" }))
    .pipe(gulp.dest(`${out_dir}/images/`));

  // Создаем поток для оригинальных форматов
  const originalStream = gulp
    .src(`${root_dir}/images/*`)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        optimizationLevel: 5,
        use: [pngquant()],
      })
    )
    .pipe(debug({ title: "imagemin:original" }))
    .pipe(gulp.dest(`${out_dir}/images/`));

  return merge(webpStream, originalStream); // Объединяем потоки
});

// Копирование шрифтов
gulp.task("fonts", () =>
  gulp.src(`${root_dir}/fonts/**/*`).pipe(gulp.dest(`${out_dir}/fonts/`))
);

// Копирование иконок
gulp.task("icons", () =>
  gulp.src(`${root_dir}/icons/**/*`).pipe(gulp.dest(`${out_dir}/icons/`))
);

// Отслеживание изменений в Pug файлах
gulp.task("pug-watch", gulp.series("pug"), (done) => {
  browserSync.reload();
  done();
});

// Отслеживание изменений в SCSS файлах
gulp.task("sass-watch", gulp.series("sass"), (done) => {
  browserSync.reload();
  done();
});

// Отслеживание изменений во всех файлах
gulp.task("watch", () => {
  browserSync.init({
    server: { baseDir: out_dir }, // Указываем папку сервера
  });

  // Следим за изменениями в файлах и запускаем соответствующие таски
  gulp.watch(`${root_dir}/scss/**/*.scss`, gulp.series("sass-watch"));
  gulp.watch(`${root_dir}/views/**/*.pug`, gulp.series("pug-watch"));
  gulp.watch(`${root_dir}/js/**/*.js`, gulp.series("scripts"));
  gulp.watch(`${root_dir}/images/`, gulp.series("imagemin"));
  gulp.watch(`${root_dir}/fonts/**/*`, gulp.series("fonts"));
});

// Задача сборки проекта
gulp.task(
  "build",
  gulp.series("sass", "pug", "scripts", "imagemin", "fonts", "icons")
);

// Задача по умолчанию
gulp.task("default", gulp.series("build", "watch"));