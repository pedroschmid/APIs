import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";

import { CreatureRoutes } from "./routes/creatureRoute";

class App {
  public app: express.Application;
  public creatureRoute: CreatureRoutes = new CreatureRoutes();
  public mongoURL: string =
    "mongodb+srv://root:root@powertrip-zp9uk.mongodb.net/Bestiary?retryWrites=true&w=majority";

  constructor() {
    this.app = express();
    this.config();
    this.creatureRoute.routes(this.app);
    this.mongoSetup();
  }

  public config() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  public mongoSetup(): void {
    require("mongoose").Promise = global.Promise;

    mongoose.connect(this.mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}

export default new App().app;
