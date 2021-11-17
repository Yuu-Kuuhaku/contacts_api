import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import blackListTokenService from "../services/blackListTokenService";
import tokenService from "../services/tokenService";
const SECRET= "minhasecretsecreta";

class auth {
  constructor(){}

  async verifyAuth(req: Request, res: Response, next){
    try {
      console.log(next);
      const token =  req.headers['authorization'];
      console.log(token);

      const tokenBlocked = await blackListTokenService.findOne(token);
      console.log(tokenBlocked)

      if(tokenBlocked) throw new Error();

      const teste = await jwt.verify(token, SECRET);
      next();
    } catch (error) {
      return res.status(401).json({erro: "Token invalido"})
    }
  }

  async createToken ( userId ){
    return await jwt.sign({ userId }, SECRET ,  { expiresIn: 500})
  }

  async createRefreshToken ( userId ){
    try {
      const token = await jwt.sign({ userId }, SECRET, {  expiresIn: 5000 });
      const decode = jwt.decode(token);
      const tokenSaved = await tokenService.create({token , expirationDate: new Date(decode["exp"] * 1000) })
      return token
    } catch (error) {
      return error
    }
  }

  async decodeToken (token) {
    return await jwt.decode(token);
  }

}

export default new auth ;