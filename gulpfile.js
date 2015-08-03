var gulp = require("gulp");
var header = require("gulp-header");
var ts = require("gulp-typescript");

gulp.task("default", function () {
    var tsResult = gulp.src(["src/**/*.ts", "typings/node/node.d.ts"])
        .pipe(ts({
            noImplictAny: true,
            out: "extropy.js"
        }));

    return tsResult.js
        .pipe(header("#! /usr/bin/env node\n\n"))
        .pipe(gulp.dest("build"))
});
