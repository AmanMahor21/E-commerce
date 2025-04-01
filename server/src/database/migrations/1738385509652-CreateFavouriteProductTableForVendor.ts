/* eslint-disable @typescript-eslint/brace-style */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFavouriteProductTableForVendor1738385509652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'vendor_product_favorite',
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
          name: 'vendor_id',
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
          onUpdate: 'CURRENT_TIMESTAMP',
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
          columnNames: ['vendor_id'],
          referencedTableName: 'vendor',
          referencedColumnNames: ['vendor_id'],
          onDelete: 'CASCADE',
        },
      ],
    });
    const ifExists = await queryRunner.hasTable('vendor_product_favorite');
    if (!ifExists) {
      await queryRunner.createTable(table);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vendor_product_favorite', true);
  }
}
