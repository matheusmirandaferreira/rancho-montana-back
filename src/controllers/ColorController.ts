import { Request, Response } from 'express';
import { ColorRepository } from '../repository/ColorRepository';

const repo = new ColorRepository();

export class ColorController {
  async getColor(req: Request, res: Response) {
    const { uuid: uuidcolor } = req.params;

    const result = await repo.getColor({ uuidcolor });

    if (result instanceof Error)
      return res
        .status(422)
        .json({ message: result.message, errors: result.cause });

    return res.json(result);
  }

  async create(req: Request, res: Response) {
    try {
      const { nmcolor } = req.body;

      const result = await repo.create({ nmcolor });

      if (result instanceof Error)
        return res
          .status(422)
          .json({ message: result.message, errors: result.cause });

      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const result = await repo.list();

      if (result instanceof Error)
        return res
          .status(422)
          .json({ message: result.message, errors: result.cause });

      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { uuid } = req.params;
      const { nmcolor } = req.body;

      const result = await repo.edit({ uuid, nmcolor });

      if (result instanceof Error)
        return res
          .status(422)
          .json({ message: result.message, errors: result.cause });

      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uuid } = req.params;

      const result = await repo.delete({ uuid });

      if (result instanceof Error)
        return res
          .status(422)
          .json({ message: result.message, errors: result.cause });

      return res.json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
