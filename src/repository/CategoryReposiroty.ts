import { AppDataSource } from '../data-source';
import { Category } from '../models/Category';

const repo = AppDataSource.getRepository(Category);

export class CategoryReposiroty {
  async list() {
    const data = await repo.find();

    return Object({ status: '00', data });
  }
}
