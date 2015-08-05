/// <reference path="../../typings/node/node.d.ts" />

var express = require("express");

module Extropy {

    export class GameHostServer {

        constructor() {
            var app = express();
            app.get("/", (req, res) => {
                res.send("Hello World");
            });

            var server = app.listen(3000, () => {
                var host = server.address().address;
                var port = server.address().port;
                console.log("Listening here: http:%s:%s", host, port);
            });
        }
    }   
}

module.exports = Extropy;
