import { Request, Response } from "express";
import  phoneService  from "../services/phoneService";
import * as yup from 'yup';
import contactsService from "../services/contactsService";

export default class ContactsControllers {

  async create ( req: Request, res: Response){
    try {
      let schemaPhone = yup.object().shape({
        number: yup.string().required('O campo numero é obrigatório'),
        type: yup.string().required('O campo tipo do numero é obrigatório').oneOf(["CELL", "JOB", "LANDLINE"], "O tipo de numero enviado não é um tipo reconhecido")
      });
      const body = req.body;
      const {contactId} = req.params;
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
      await schemaPhone.validate(body);
      console.log(body);
      const phone = await phoneService.create(contactId, body);
      console.log(phone)
      res.status(201).json(body);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async update (req: Request, res: Response){
    try {
      const { contactId, phoneId } = req.params;
      const body  = req.body;
      const phone = await phoneService.findOne( contactId, phoneId );
      if (!phone){
        throw ({
          "errors": [
            "Número de telefone não encontrado"
          ],
          "name": "Phones Errors",
          "message": "Número de telefone não encontrado"
        });
      }
      const phoneUpdated = await phoneService.update( phoneId, body);
      res.status(200).json(phoneUpdated);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async list ( req: Request, res: Response){
    try {
      const { contactId } = req.params;
      const phones = await phoneService.list(contactId);
      res.status(200).json(phones);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async findOne (req: Request, res: Response){
    try {
      const { contactId, phoneId } = req.params;
      const phone = await phoneService.findOne( contactId, phoneId );
      if (!phone){
        throw ({
          "errors": [
            "Número de telefone não encontrado"
          ],
          "name": "Phones Errors",
          "message": "Número de telefone não encontrado"
        });
      }
      res.status(200).json(phone);
      // const contact = await contactsService.findOne();
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async delete (req: Request, res: Response){
    try {
      const { contactId, phoneId } = req.params;
      const phone = await phoneService.findOne( contactId, phoneId );
      if (!phone){
        throw ({
          "errors": [
            "Número de telefone não encontrado"
          ],
          "name": "Phones Errors",
          "message": "Número de telefone não encontrado"
        });
      }
      const phonedeleted = await phoneService.delete( phoneId);
      res.status(200).json(phonedeleted);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

}
