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

  async update(contactId, {name, email }){
    return await prisma.contacts.update({
      where: {
        id: contactId
      },
      data: {
        name,
        email
      },
      include:{
        Phones: true
      }
    })
  }

  async list(search){
    return await prisma.contacts.findMany({
      where: {
        name: {
          contains: search
        }
      },
      include: {
        Phones: true
      },
      orderBy:[
        {
          name: 'asc',
        }
      ]
    });
  }

  async findOne( search){
    return await prisma.contacts.findUnique({
      where: {
        id: search
      },
      include: {
        Phones: true
      }
    })
  }

  async delete (contactId){
    return await prisma.contacts.delete({
      where: {
        id: contactId
      }
    })
  }
}

export default new ContactsService();
