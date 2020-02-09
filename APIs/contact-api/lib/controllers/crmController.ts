import * as mongoose from 'mongoose'
import { Request, Response } from 'express'
import { ContactSchema } from '../models/crmModel'

let Contact = mongoose.model('Contact', ContactSchema)

export class ContactController {

    public getContacts(req: Request, res: Response) {
        Contact.find((err, contact) => {
            if(err) {
                res.send(err)
            }

            res.json(contact)
        })
    }

    public getContactWithID(req: Request, res: Response) {
        let ID = req.params.contactId

        Contact.findById(ID, (err, contact) => {
            if(err) {
                res.send(err)
            }

            res.json(contact)
        })
    }

    public addNewContact(req: Request, res: Response) {
        let newContact = new Contact(req.body)

        newContact.save((err, contact) => {
            if(err) {
                res.send(err)
            }

            res.json(contact)
        })
    }

    public updateContact(req: Request, res: Response) {
        let ID = req.params.contactId

        Contact.findOneAndUpdate({ _id: ID }, req.body, { new: true }, (err, contact) => {
            if(err) {
                res.send(err)
            }

            res.json(contact)
        })
    }

    public deleteContact(req: Request, res: Response) {
        let ID = req.params.contactId

        Contact.remove({ _id: ID }, (err) => {
            if(err) {
                res.send(err)
            }

            res.json({ message: 'Successfully deleted contact!' })
        })
    }
}