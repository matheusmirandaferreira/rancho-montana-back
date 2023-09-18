import { Request, Response } from 'express';

import { UserRepository } from '../repository/UserRepository';

const repo = new UserRepository();

export class UserController {
  async getUser(req: Request, res: Response) {
    try {
      const { uuid: uuiduser } = req.params;

      const result = await repo.getUser({ uuiduser });

      if (result instanceof Error)
        return res.status(400).json({
          status: '01',
          message: result.message,
          errors: result.cause,
        });

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await repo.login({ email, password });

      if (result instanceof Error)
        return res.status(400).json({
          status: '01',
          message: result.message,
          errors: result.cause,
        });

      return res.json(result);
    } catch (err) {
      console.log('Login ERR', err);
      return res.status(500).json({ message: err.message });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { nmuser, email, password } = req.body;

      const result = await repo.createUser({
        nmuser,
        email,
        password,
      });

      if (result instanceof Error)
        return res.status(422).json({
          status: '01',
          message: result.message,
          errors: result.cause,
        });

      return res.json(result);
    } catch (err) {
      console.log('err', err);
      return res
        .status(500)
        .json({ message: 'Houve um erro ao criar o usuário' });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const result = await repo.getUsers();

      if (result instanceof Error)
        return res
          .status(500)
          .json({ message: 'Houve um erro ao carregar seus dados' });

      return res.json(result);
    } catch (err) {
      console.log(err);
    }
  }

  async editUser(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const { nmuser, email, newpassword, oldpassword } = req.body;

      const result = await repo.editUser({
        uuiduser: uuid,
        email,
        nmuser,
        newpassword,
        oldpassword,
      });

      if (result instanceof Error)
        return res.status(400).json({
          status: '01',
          message: result.message,
          errors: result.cause,
        });

      return res.json({ status: '00', user: result });
    } catch (err) {
      console.log(err);
    }
  }
}
