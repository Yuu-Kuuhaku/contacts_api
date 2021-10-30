import {prisma} from "../infra/prisma";

class UserService {
  constructor(){}

  async create( {name, password, email }) {
    return await prisma.users.create({
      data: {
        name,
        email,
        password
      }
    });
  }

  async update(userId, {name, email }){
    return await prisma.users.update({
      where: {
        id: userId
      },
      data: {
        name,
        email
      }
    })
  }

  async list(){
    return await prisma.users.findMany({
      orderBy:[
        {
          name: 'asc',
        }
      ]
    });
  }

  async findOne( search ){
    return await prisma.users.findFirst({
      where: {
        OR: [
          {
            id: search
          },
          {
            email: search
          },
        ]
      },
    })
  }

  async delete (userId){
    return await prisma.users.delete({
      where: {
        id: userId
      }
    })
  }

  async changePassword ( userId, password){
    return await prisma.users.update({
      where: {
        id: userId
      },
      data: {
        password
      }
    })
  }

}

export default new UserService();