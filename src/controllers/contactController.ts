import { Request, Response } from "express";
import  contactsService  from "../services/contactsService";
import * as yup from 'yup';

export default class ContactsControllers {

  async create ( req: Request, res: Response){
    try {
      let schemaContacts = yup.object().shape({
        name: yup.string().required("O Campo nome do contato é obrigatório"),
        email: yup.string().required("O Campo e-mail do contato é obrigatório").email("O email informado não é um email valido"),
        phones: yup.array().required("Os campos de telefones são obrigatorios").min( 1,'É necessario ter ao menos um telefone').of(yup.object().shape({
          number: yup.string().required('O Campo numero é obrigatório'),
          type: yup.string().required('O campo tipo do numero é obrigatório').oneOf(["CELL", "JOB", "LANDLINE"], "O tipo de numero enviado não é um tipo reconhecido")
        }))
      });

      const body = req.body;
      await schemaContacts.validate(body)
      console.log(body);
      const contact = await contactsService.create(body);
      console.log(contact)
      res.status(201).json(body);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async update (req: Request, res: Response){
    try {
      const { contactId } = req.params;
      const body  = req.body;
      const contact = await contactsService.findOne( contactId );
      if (!contact){
        throw ({
          "errors": [
            "Contato não encontrado"
          ],
          "name": "Contacts Errors",
          "message": "Contato não encontrado"
        });
      }
      const contactUpdated = await contactsService.update(contactId, body);
      res.status(200).json(contactUpdated);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async list ( req: Request, res: Response){
    try {
      const { search } = req.query;
      const contacts = await contactsService.list(search);
      res.status(200).json(contacts);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async findOne (req: Request, res: Response){
    try {
      const { contactId } = req.params;
      const contact = await contactsService.findOne( contactId );
      if (!contact){
        throw ({
          "errors": [
            "Contato não encontrado"
          ],
          "name": "Contacts Errors",
          "message": "Contato não encontrado"
        });
      }
      res.status(200).json(contact);
      // const contact = await contactsService.findOne();
    } catch (error) {
      res.status(400).json(error);
    }
  }


  async delete (req: Request, res: Response){
    try {
      const { contactId } = req.params;
      const contact = await contactsService.findOne( contactId );
      if (!contact){
        throw ({
          "errors": [
            "Contato não encontrado"
          ],
          "name": "Contacts Errors",
          "message": "Contato não encontrado"
        });
      }
      const contactDeleted = await contactsService.delete(contactId);
      res.status(200).json(contactDeleted);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }
}

