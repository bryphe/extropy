/// <reference path="../../typings/node/node.d.ts" />

var express = require("express");
var path = require("path");

module Extropy {

    export class GameHostServer {

        constructor(rootDirectory: string) {
            var app = express();
            app.get("/", (req, res) => {
                res.send("Hello World");
            });

            // Serve the files from the users folder
            app.use(express.static(rootDirectory));

            // Serve the files for the app as well
            var hostClientFilesPath = path.join(__dirname, "../client");
            app.use(express.static(hostClientFilesPath));

            var scriptFilesPath = path.join(__dirname, "../core");
            app.use(express.static(scriptFilesPath));

            var server = app.listen(3000, () => {
                var host = server.address().address;
                var port = server.address().port;
                console.log("Listening here: http:%s:%s", host, port);
            });
        }
    }
}

module.exports = Extropy;
