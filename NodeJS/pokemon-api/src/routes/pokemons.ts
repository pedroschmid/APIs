import { Request, Response } from 'express'

import pokemons = require('../db.json')

export class Pokemons {

    public routes(app): void {
        app.route('/pokemons')
            .get((req: Request, res: Response) => {
                res.status(200).send(pokemons)
            })
    }
}