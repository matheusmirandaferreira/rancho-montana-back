import { Request, Response } from 'express';
import { RaceRepository } from '../repository/RaceRepository';

const repo = new RaceRepository();

export class RaceController {
  async create(req: Request, res: Response) {
    try {
      const { nmrace } = req.body;

      const result = await repo.create({ nmrace });

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
      const { nmrace } = req.body;

      const result = await repo.edit({ uuid, nmrace });

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
