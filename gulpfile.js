const { src, dest, watch, series, parallel } = require("gulp");
const cssnano = require("gulp-cssnano");
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync").create();
const fileinclude = require('gulp-file-include');


const paths = {
    html: { src: "app/**/*.html", dest: "dist/" },
    scss: { src: "app/scss/**/*.scss", dest: "dist/css/" },
    js:   { src: "app/js/**/*.js",     dest: "dist/js/"  },
    img:  { src: "app/img/**/*.{png,jpg,jpeg,svg,gif,webp}", dest: "dist/img/" }
};

function html() {
    return src(paths.html.src)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true,
        }))
        .pipe(rename(p => { p.dirname = ""; }))
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream());

}


function style() {
    return src(paths.scss.src)
        .pipe(sass().on("error", sass.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

function scripts() {
    return src(paths.js.src)
        .pipe(concat("bundle.js"))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest(paths.js.dest))
        .pipe(browserSync.stream());
}

function imgs() {
    return src(paths.img.src, {encoding: false})


        .pipe(imagemin())
        .pipe(dest(paths.img.dest));
}

function reload(done) { browserSync.reload(); done(); }

function serve() {
    browserSync.init({ server: { baseDir: "dist" }, open: true, notify: false });
    watch(paths.html.src, html);
    watch(paths.scss.src, style);
    watch(paths.js.src, scripts);
    watch(paths.img.src, series(imgs, reload));
}

const bootstrapCSS = () => {
    return src('https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css')
        .pipe(dest('dist/css'));
}

const bootstrapJS = () => {
    return src('https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI')
        .pipe(dest('dist/js'));
}

const build = series(parallel(html, style, scripts, imgs));

exports.html = html;
exports.style = style;
exports.scripts = scripts;
exports.imgs = imgs;
exports.build = build;
exports.default = series(build, serve);
