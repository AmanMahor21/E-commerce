import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFavoriteProductTable1737640643929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'product_favorite',
      columns: [
        {
          name: 'product_favorite_id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
          isNullable: false,
        },
        {
          name: 'product_id',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'customer_id',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'created_by',
          type: 'integer',
          length: '11',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'modified_by',
          type: 'integer',
          length: '11',
          isPrimary: false,
          isNullable: true,
        },
        {
          name: 'created_date',
          type: 'DATETIME',
          isPrimary: false,
          isNullable: true,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'modified_date',
          type: 'DATETIME',
          isPrimary: false,
          isNullable: true,
          default: 'CURRENT_TIMESTAMP',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['product_id'],
          referencedTableName: 'product',
          referencedColumnNames: ['product_id'],
          onDelete: 'CASCADE',
        },
        {
          columnNames: ['customer_id'],
          referencedTableName: 'customer',
          referencedColumnNames: ['id'],
          onDelete: 'CASCADE',
        },
      ],
    });

    const ifExists = await queryRunner.hasTable('product_favorite');
    if (!ifExists) {
      await queryRunner.createTable(table);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_favorite', true);
  }
}
