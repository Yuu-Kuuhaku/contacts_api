import { Phones } from ".prisma/client";
import { type } from "os";
import {prisma} from "../infra/prisma";

class ContactsService {
  constructor(){}
  async create({name, email , phones}) {
    console.log(phones)
    return await prisma.contacts.create({
      data: {
        name,
        email,
        Phones: {
          createMany: {
            data: phones
          }
        }
      }
    })
  }
}

export default new ContactsService();
