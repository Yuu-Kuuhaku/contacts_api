import { Request, Response } from "express";
import { Contacts } from "../services/contacts";
import * as yup from 'yup';

export default class ContactsControllers {

  private contactsService: Contacts;

  
  constructor(){
    this.contactsService = new Contacts();
  }

  async create ( req: Request, res: Response){
    try {
      let schemaContacts = yup.object().shape({
        name: yup.string().required("O Campo nome do contato é obrigatório"),
        email: yup.string().required("O Campo e-mail do contato é obrigatório").email("O email informado não é um email valido"),
        phones: yup.array().required("Os campos de telefones são obrigatorios").length( 1,'É necessario ter ao menos um telefone').of(yup.object().shape({
          number: yup.string().required('O Campo numero é obrigatório'),
          type: yup.string().required('O campo tipo do numero é obrigatório')
        }))
      });

      const body = req.body;
      await schemaContacts.validate(body)

      const contact = await this.contactsService.create(body);
      console.log(contact)
      return contact;
    } catch (error) {
      res.status(400).json(error)
    }
  }

  async list ( req: Request, res: Response){
    try {
      res.send('teste2')
    } catch (error) {
      console.log(error);
    }
  }
}

