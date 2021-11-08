import {prisma} from "../infra/prisma";

class TokenService {
  constructor(){}

  async create( {token, expirationDate }) {
    return await prisma.token.create({
      data: {
        token,
        expirationDate
      }
    });
  }

  async list(){
    return await prisma.token.findMany({
      orderBy:[
        {
          token: 'asc',
        }
      ]
    });
  }

  async findOne( search ){
    return await prisma.token.findFirst({
      where: {
        token: search
      },
    })
  }
}

export default new TokenService();