import { Phones } from ".prisma/client";
import { type } from "os";
import {prisma} from "../infra/prisma";

class Contacts {
  async create({name, email , phones}) {
    console.log(phones)
    return await prisma.contacts.create({
      data: {
        name,
        email,
        Phones: {
          createMany: {
            data: phones.map( (item: Phones ) => {
              return {
                type: 'trabalho',
                number: '7783893943'
              }
            })
          }
        }
      }
    })
  }
}

export { Contacts }
