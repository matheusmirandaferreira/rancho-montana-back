import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Category } from '../../models/Category';

export default class CategorySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Category);

    if (!(await repository.exist()))
      await repository.insert([
        {
          category_permalink: 'muar',
          nmcategory: 'Muar',
        },
        {
          category_permalink: 'equino',
          nmcategory: 'Equino',
        },
      ]);
  }
}
