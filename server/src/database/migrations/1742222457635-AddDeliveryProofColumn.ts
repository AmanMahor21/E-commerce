import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDeliveryProofColumn1742222457635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'order',
      new TableColumn({
        name: 'delivery_proof',
        type: 'varchar',
        length: '50',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('order', 'delivery_proof');
  }
}
