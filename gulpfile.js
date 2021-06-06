const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");

// Styles

const styles = () => {
  return gulp
    .src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("docs/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// HTML

const html = () => {
  return gulp
    .src("source/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("docs"));
};

exports.html = html;

// Images

const optimizeImages = () => {
  return gulp
    .src("source/img/**/*.{png,jpg,svg}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [{ cleanupIDs: true }],
        }),
      ])
    )
    .pipe(gulp.dest("docs/img"));
};

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg,svg}").pipe(gulp.dest("docs/img"));
};

exports.copyImages = copyImages;

// WebP

const createWebp = () => {
  return gulp
    .src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("docs/img"));
};

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp
    .src("source/img/icons/*.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("docs/img"));
};

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp
    .src(
      [
        "source/fonts/*.{woff2,woff}",
        "source/*.ico",
        "source/img/**/*.svg",
        "!source/img/icons/*.svg",
        "source/*.webmanifest",
        "source/js/*.js",
      ],
      { base: "source" }
    )
    .pipe(gulp.dest("docs"));
  done();
};

exports.copy = copy;

// Clean

const clean = () => {
  return del("docs");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "docs",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/img/icons/*.svg", gulp.series(sprite, reload));
  gulp.watch("source/sass/**/*.scss", gulp.series(styles, reload));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(styles, html, sprite, createWebp)
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, html, sprite, createWebp),
  gulp.series(server, watcher)
);


