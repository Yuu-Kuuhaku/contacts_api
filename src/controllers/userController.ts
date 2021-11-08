import { Request, Response } from "express";
import * as yup from 'yup';
import bcrypt from 'bcrypt'
import userService from "../services/userService";
import auth from "../middleware/auth"
import blackListTokenService  from "../services/blackListTokenService";

export default class UserControllers {

  async create ( req: Request, res: Response){
    try {
      let schemaUser = yup.object().shape({
        name: yup.string().required("O campo nome é obrigatório").min(8, "É preciso ter no minino 8 caracteres para o campo nome"),
        email: yup.string().required("O campo e-mail é obrigatório").email("O email informado não é um email valido"),
        password: yup.string().required("O campo senha é obrigatório").min(8, "É preciso ter no minino 8 caracteres para a senha")
      });
      const body = req.body;

      const user = await userService.findOne( body.email );

      if (user){
        throw ({
          "errors": [
            "E-mail ja esta em uso"
          ],
          "name": "Users Errors",
          "message": "E-mail ja esta em uso"
        });
      }
      await schemaUser.validate(body);

      const hashPassword = await bcrypt.hash(body.password, 14 );

      const newUser = await userService.create( {...body, password: hashPassword});
      res.status(201).json(body);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async update (req: Request, res: Response){
    try {
      const { userId } = req.params;
      const body  = req.body;
      const user = await userService.findOne( userId );
      if (!user){
        throw ({
          "errors": [
            "Usuario não encontrado"
          ],
          "name": "Users Errors",
          "message": "Usuario não encontrado"
        });
      }
      const userUpdated = await userService.update(userId, body);
      res.status(200).json(userUpdated);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async list ( req: Request, res: Response){
    try {
      const contacts = await userService.list();
      res.status(200).json(contacts);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async findOne (req: Request, res: Response){
    try {
      const { userId } = req.params;
      const user = await userService.findOne( userId );
      if (!user){
        throw ({
          "errors": [
            "Usuario não encontrado"
          ],
          "name": "Users Errors",
          "message": "Usuario não encontrado"
        });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async delete (req: Request, res: Response){
    try {
      const { userId } = req.params;
      const user = await userService.findOne( userId );
      if (!user){
        throw ({
          "errors": [
            "Usuario não encontrado"
          ],
          "name": "Users Errors",
          "message": "Usuario não encontrado"
        });
      }
      const userDeleted = await userService.delete(userId);
      res.status(200).json(userDeleted);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async changePassword(req: Request, res: Response){
    try {
      let schemaChangePassword = yup.object().shape({
        newPassword: yup.string().required("O campo senha é obrigatório").min(8, "É preciso ter no minino 8 caracteres para a senha"),
        oldPassword: yup.string().required("O campo senha atual é obrigatório").min(8, "É preciso ter no minino 8 caracteres para a senha atual")
      });
      const { userId } = req.params;
      const body  = req.body;
      const user = await userService.findOne( userId );
      if (!user){
        throw ({
          "errors": [
            "Usuario não encontrado"
          ],
          "name": "Users Errors",
          "message": "Usuario não encontrado"
        });
      }
      await schemaChangePassword.validate(body);
      var isValid = await bcrypt.compare(body.oldPassword, user.password);
      console.log(isValid);
      if(!isValid){
        throw ({
          "errors": [
            "Senha incorreta"
          ],
          "name": "Users Errors",
          "message": "Senha incorreta"
        });
      }

      const hashPassword = await bcrypt.hash(body.newPassword, 14 );

      await userService.changePassword(userId, hashPassword);
      res.status(200).json(body);

    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async login(req: Request, res: Response){
    try {
      const body  = req.body;
      const user = await userService.findOne( body.email );
      if (!user){
        throw ({
          "errors": [
            "Email ou senha incorretos"
          ],
          "name": "Users Errors",
          "message": "Email ou senha incorretos"

        });
      }

      const isValid = await bcrypt.compare(body.password, user.password);
      console.log(isValid)
      if (!isValid){
        throw ({
          "errors": [
            "Email ou senha incorretos"
          ],
          "name": "Users Errors",
          "message": "Email ou senha incorretos"

        });
      }

      const token = await auth.createToken(user.id);
      const refreshToken = await auth.createRefreshToken(user.id);

      delete user.password
      res.status(200).json({user, token, refreshToken});
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async refreshToken(req: Request, res: Response) {

    try {
      const token = req.headers['authorization'];

      const jsonToken = await auth.decodeToken(token);
      console.log(jsonToken);
      if(!jsonToken['refresh']) {
        throw({
          "errors": [
            "Token invalido"
          ],
          "name": "Users Errors",
          "message": "Token invalido"

        })
      }

      const newToken = await auth.createToken( jsonToken["userId"]);
      const refreshToken = await auth.createRefreshToken(jsonToken["userId"]);
      console.log(refreshToken)
      res.status(200).json({ token: newToken, refreshToken});

    } catch (error) {
      console.log(error);
      res.status(401).json(error);
    }
  }

  // async removeToken ( req: Request, res: Response){
  //   try {
  //     const body  = req.body;

  //     const token = await blackListTokenService.findOne( body.refreshToken );

  //   } catch (error) {
      
  //   }
  //   blackListTokenService
  // }
}

