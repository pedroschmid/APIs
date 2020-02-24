import * as express from 'express'
import * as bodyParser from 'body-parser'

import { Pokemons } from './routes/pokemons'

class App {

    public app: express.Application;
    public pokeRoutes: Pokemons = new Pokemons()

    constructor() {
        this.app = express()
        this.config()
        this.pokeRoutes.routes(this.app)
    }

    private config(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({
            extended: true
        }))
    }
}

export default new App().app;