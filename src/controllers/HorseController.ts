import { Request, Response } from 'express';
import { HorseRepository } from '../repository/HorseRepository';

const repo = new HorseRepository();

export class HorseController {
  async getHorse(req: Request, res: Response) {
    const { uuid: uuidhorse } = req.params;

    const result = await repo.getHorse({ uuidhorse });

    if (result instanceof Error)
      return res
        .status(422)
        .json({ message: result.message, errors: result.cause });

    return res.json(result);
  }

  async list(req: Request, res: Response) {
    const result = await repo.list();

    return res.json(result);
  }

  async edit(req: Request, res: Response) {
    try {
      const { uuid: uuidhorse } = req.params;
      const { birthdate, uuidcolor, uuidpace, uuidrace, nmhorse, description } =
        req.body;

      const result = await repo.edit({
        uuidhorse,
        birthdate,
        uuidcolor,
        uuidpace,
        uuidrace,
        nmhorse,
        description,
      });

      if (result instanceof Error)
        return res
          .status(422)
          .json({ message: result.message, errors: result.cause });

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Houve um erro ao editar o cavalo' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid: uuidhorse } = req.params;

      const result = await repo.delete({ uuidhorse });

      if (result instanceof Error)
        return res
          .status(422)
          .json({ message: result.message, errors: result.cause });

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Houve um erro ao deletar o cavalo' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { birthdate, nmhorse, uuidcolor, uuidpace, uuidrace, description } =
        req.body;

      const result = await repo.create({
        birthdate,
        nmhorse,
        uuidcolor,
        uuidpace,
        uuidrace,
        description,
      });

      if (result instanceof Error)
        return res
          .status(422)
          .json({ message: result.message, errors: result.cause });

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Houve um erro ao criar o cavalo' });
    }
  }
}
