import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Color1686520435537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'color',
        columns: [
          {
            name: 'uuidcolor',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'nmcolor',
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
    await queryRunner.dropTable('color');
  }
}
