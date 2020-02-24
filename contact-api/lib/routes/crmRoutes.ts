import { Request, Response } from 'express'
import { ContactController } from '../controllers/crmController'

export class Routes {

    public contactController: ContactController = new ContactController()

    public routes(app): void {

        app.route('/contact')
        .get(this.contactController.getContacts)
        .post(this.contactController.addNewContact)
    }
}