var gulp = require("gulp");
var header = require("gulp-header");
var ts = require("gulp-typescript");
var merge = require("merge2");

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
});

gulp.task("build-core-common", function () {
        var tsResult = gulp.src(["src/core/common/**/*.ts", "typings/q/Q.d.ts"])
            .pipe(ts({
                    noExternalResolve: true,
                    out: "extropy.common.js",
                    target: "ES5",
                    declarationFiles: true
            }));

        return merge([
                tsResult.js.pipe(gulp.dest("build/core/common")),
                tsResult.dts.pipe(gulp.dest("build/core/common"))]);
});

gulp.task("build-core-client", ["build-core-common"], function () {
        var tsResult = gulp.src(["src/core/client/**/*.ts", "typings/q/Q.d.ts", "build/core/common/extropy.common.d.ts"])
            .pipe(ts({
                    noExternalResolve: true,
                    out: "extropy.client.js",
                    target: "ES5"
            }));

        return tsResult.js.pipe(gulp.dest("build/core/client"));
});

gulp.task("default", ["build-cli", "build-host", "build-client-html", "build-core-common", "build-core-client"]);
