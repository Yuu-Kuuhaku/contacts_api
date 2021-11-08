import {prisma} from "../infra/prisma";

class BlackListTokenService {
  constructor(){}

  async create( {token, expirationDate }) {
    return await prisma.blackListToken.create({
      data: {
        token,
        expirationDate
      }
    });
  }

  async list(){
    return await prisma.blackListToken.findMany({
      orderBy:[
        {
          token: 'asc',
        }
      ]
    });
  }

  async findOne( search ){
    return await prisma.blackListToken.findFirst({
      where: {
        token: search
      },
    })
  }
}

export default new BlackListTokenService();