"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const creatureRoute_1 = require("./routes/creatureRoute");
class App {
    constructor() {
        this.creatureRoute = new creatureRoute_1.CreatureRoutes();
        this.mongoURL = "mongodb+srv://root:root@powertrip-zp9uk.mongodb.net/Bestiary?retryWrites=true&w=majority";
        this.app = express();
        this.config();
        this.creatureRoute.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        require("mongoose").Promise = global.Promise;
        mongoose.connect(this.mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map