import { Phones } from ".prisma/client";
import { type } from "os";
import {prisma} from "../infra/prisma";

class PhoneService {
  constructor(){}

  async create( contactId, {type, number }) {
    return await prisma.phones.create({
      data: {
        number,
        type,
        contactsId: contactId
      }
    });
  }

  async update (  phoneId, {type, number}){
    return await prisma.phones.update({
      where: {
        id: phoneId
      },
      data: {
        number,
        type
      }
    })
  }

  async list (contactId){
    return await prisma.phones.findMany({
      where: {
        contactsId: contactId
      }
    })
  }

  async findOne(contactId, phoneId){
    return await prisma.phones.findFirst({
      where: {
        AND: [
          {
            contactsId: contactId
          },
          {
            id: phoneId
          }
        ]
      }
    })
  }

  async delete (phoneId){
    return await prisma.phones.delete({
      where: {
        id: phoneId
      }
    })
  }

}


export default new PhoneService();