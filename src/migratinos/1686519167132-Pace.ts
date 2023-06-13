import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Pace1686519167132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pace',
        columns: [
          {
            name: 'uuidpace',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'nmpace',
            type: 'varchar',
            isUnique: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pace');
  }
}
