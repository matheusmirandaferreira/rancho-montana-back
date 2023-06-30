import { Request, Response } from 'express';
import { CategoryReposiroty } from '../repository/CategoryReposiroty';

const repo = new CategoryReposiroty();

export class CategoryController {
  async list(req: Request, res: Response) {
    try {
      const result = await repo.list();

      if (result instanceof Error)
        return res.status(400).json({
          status: '01',
          message: result.message,
          errors: result.cause,
        });

      return res.json(result);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: 'Houve um erro ao buscar as categorias.' });
    }
  }
}
