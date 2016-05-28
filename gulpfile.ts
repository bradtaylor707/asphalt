"use strict";

const fs = require("fs");
const del = require("del");

const gulp = require("gulp");
const gulpSass = require("gulp-sass");
const gulpTsLint = require("gulp-tslint");
const gulpTypings = require("gulp-typings");
const gulpServer = require("gulp-server-livereload");

const ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json");

const sourcemaps = require("gulp-sourcemaps");

const tslint = require("gulp-tslint");

let node_modules = [
	"./node_modules/es6-shim/es6-shim.min.js",
	"./node_modules/systemjs/dist/system-polyfills.js",
	"./node_modules/systemjs/dist/system.src.js",
	"./node_modules/reflect-metadata/Reflect.js",
	"./node_modules/rxjs/**",
	"./node_modules/zone.js/dist/**",
	"./node_modules/@angular/**"
];

/**
 * Remove build directory.
 */
function clean(done) {
	return del(["build"], done);
}

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
function compile() {
	let tsResult = gulp.src("src/**/*.ts")
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject));

	return tsResult.js.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("build"));
}

function sass() {
	gulp.src("src/**/*.scss").pipe(gulpSass()).pipe("build");
}

function html() {
	gulp.src("src/**/*.html").pipe(gulp.dest("build"));
}

/**
 * copy /res -> build/res
 */
function res() {
	return gulp.src(["res/**/*"]).pipe(gulp.dest("build"));
}

/**
 * copy node_modules to /build/node_modules
 */
function copyLibs() {
	return gulp.src(node_modules).pipe(gulp.dest("build"));
}

function sys() {
	return gulp.src("src/systemjs.config.js").pipe(gulp.dest("build"));
}

gulp.task("clean", clean);
gulp.task("compile", compile);
gulp.task("res", res);
gulp.task("copyLibs", copyLibs);
gulp.task("sys", sys);


gulp.task("webFiles", gulp.parallel(html, sass, res));
gulp.task("build", gulp.series([clean, compile, "webFiles", copyLibs, sys]));
