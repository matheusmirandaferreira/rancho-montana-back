import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(User);

    const uuiduser = v4();
    const nmuser = 'Matheus Miranda Ferreira';
    const email = 'matheusdemirandaferreira@gmail.com';
    const salt = await bcrypt.genSalt(8);
    const password = await bcrypt.hash('123456', salt);

    if (!(await repository.exist()))
      await repository.insert([
        {
          email,
          nmuser,
          uuiduser,
          password,
        },
      ]);
  }
}
