import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1686355233019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'uuiduser',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'nmuser',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      })
    );

    const id = v4();
    const name = 'Matheus Miranda Ferreira';
    const email = 'matheusdemirandaferreira@gmail.com';
    const salt = await bcrypt.genSalt(8);
    const password = await bcrypt.hash('123456', salt);

    await queryRunner.query(
      `INSERT INTO "user" (UUIDUSER,NMUSER,EMAIL,PASSWORD) VALUES ('${id}', '${name}', '${email}', '${password}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
