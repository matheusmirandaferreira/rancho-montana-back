import { Request, Response } from 'express';
import { HorseRepository } from '../repository/HorseRepository';

const repo = new HorseRepository();

export class HorseController {
  async create(req: Request, res: Response) {
    const { birthdate, nmhorse, uuidcolor, uuidpace, uuidrace } = req.body;

    const result = await repo.create({
      birthdate,
      nmhorse,
      uuidcolor,
      uuidpace,
      uuidrace,
    });

    console.log('result', result);
  }
}
