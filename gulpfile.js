var gulp = require("gulp");
var header = require("gulp-header");
var ts = require("gulp-typescript");


gulp.task("build-cli", function () {
    var tsResult = gulp.src(["src/cli/**/*.ts", "typings/node/node.d.ts"])
        .pipe(ts({
            noImplictAny: true,
            out: "extropy-cli.js"
        }));

    return tsResult.js
        .pipe(header("#! /usr/bin/env node\n\n"))
        .pipe(gulp.dest("build/cli"))
});

gulp.task("build-host", function () {
    var tsResult = gulp.src(["src/host/**/*.ts", "typings/node/node.d.ts"])
        .pipe(ts({
            noImplictAny: true,
            out: "extropy-host.js"
        }));

    return tsResult.js
        .pipe(gulp.dest("build/host"))
});

gulp.task("build-client-html", function () {
    return gulp.src(["src/client/**/*.html"])
            .pipe(gulp.dest("build/client"));
})

gulp.task("default", ["build-cli", "build-host", "build-client-html"]);
