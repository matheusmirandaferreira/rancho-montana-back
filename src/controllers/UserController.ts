import { Request, Response } from 'express';

import { UserRepository } from '../repository/UserRepository';

const repo = new UserRepository();

export class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await repo.login({ email, password });

    if (result instanceof Error)
      return res
        .status(400)
        .json({ message: result.message, errors: result.cause });

    return res.json(result);
  }

  async createUser(req: Request, res: Response) {
    try {
      const { nmuser, email, password } = req.body;

      const result = await repo.createUser({
        nmuser,
        email,
        password: String(password),
      });

      if (result instanceof Error)
        return res
          .status(422)
          .json({ message: result.message, errors: result.cause });

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
        return res
          .status(400)
          .json({ message: result.message, errors: result.cause });

      return res.json({ status: '00', user: result });
    } catch (err) {
      console.log(err);
    }
  }
}