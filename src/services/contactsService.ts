import { Phones } from ".prisma/client";
import { type } from "os";
import {prisma} from "../infra/prisma";

class ContactsService {
  constructor(){}

  async create({name , phones}) {
    console.log(phones)
    return await prisma.contacts.create({
      data: {
        name,
        phones: {
          createMany: {
            data: phones
          }
        }
      }
    })
  }

  async update(contactId, {name }){
    return await prisma.contacts.update({
      where: {
        id: contactId
      },
      data: {
        name,
      },
      include:{
        phones: true
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
        phones: true
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
        phones: true
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
