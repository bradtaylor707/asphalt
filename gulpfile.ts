"use strict";

const fs = require("fs");
const del = require("del");

const gulp = require("gulp");
const sass = require("gulp-sass");
const server = require("gulp-server-livereload");
//const gulpTsLint = require("gulp-tslint");

const ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json");

const sourcemaps = require("gulp-sourcemaps");
const tslint = require("gulp-tslint");

let paths: any = {
	html: "src/**/*.html",
	sass: "src/**/*.scss",
	ts: "src/**/*.ts",
	res: "res/**/*",
	loader: "src/systemjs.config.js"
};

let node_modules = [
	"es6-shim/es6-shim.min.js",
	"systemjs/dist/system-polyfills.js",
	"systemjs/dist/system.src.js",
	"reflect-metadata/Reflect.js",
	"rxjs/**",
	"zone.js/dist/**",
	"@angular/**"
];

function clean(done) {
	return del(["build"], done);
}

function compile() {
	let tsResult = gulp.src(paths.ts)
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject));

	return tsResult.js.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("build"));
}

function styles() {
	return gulp.src(paths.sass).pipe(sass().on("error", sass.logError)).pipe(gulp.dest("build"));
}

function html() {
	return gulp.src(paths.html).pipe(gulp.dest("build"));
}

function res() {
	return gulp.src(paths.res).pipe(gulp.dest("build"));
}

function copyLibs() {
	return gulp.src(node_modules, {cwd: "node_modules/**"}).pipe(gulp.dest("build/node_modules"));
}

function loader() {
	return gulp.src(paths.loader).pipe(gulp.dest("build"));
}

function watch() {
	gulp.watch(paths.html, html);
	gulp.watch(paths.sass, styles);
	gulp.watch(paths.ts, compile);
	gulp.watch(paths.res, res);
	gulp.watch(paths.loader, loader);
}

function serve() {
	gulp.src("build").pipe(server({
		livereload: true,
		open: true
	}));
}

gulp.task("clean", clean);
gulp.task("compile", compile);
gulp.task("res", res);
gulp.task("copyLibs", copyLibs);
gulp.task("loader", loader);
gulp.task("webFiles", gulp.series(styles, gulp.parallel(html, res)));

gulp.task("build", gulp.series(clean, gulp.parallel(copyLibs, loader, gulp.series(compile, "webFiles"))));
gulp.task("serve", gulp.series("build", gulp.parallel(serve, watch)));