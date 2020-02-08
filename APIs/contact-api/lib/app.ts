import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'

import { Routes } from './routes/crmRoutes'

class App {

    public app: express.Application
    public routePrv: Routes = new Routes()
    public mongoUrl: string = 'mongodb+srv://root:root@powertrip-zp9uk.mongodb.net/User?retryWrites=true&w=majority'

    constructor() {
        this.app = express()
        this.config()
        this.routePrv.routes(this.app)
        this.mongoSetup()
    }

    private config(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({
            extended: false
        }))
    }

    private mongoSetup(): void {
        require('mongoose').Promise = global.Promise
        mongoose.connect(this.mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
}

export default new App().app