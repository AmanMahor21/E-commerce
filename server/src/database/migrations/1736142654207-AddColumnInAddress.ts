import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInAddress1736142654207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        length: '50',
        isNullable: false,
      })
    );

    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'house_number',
        type: 'int',
        length: '11',
        isNullable: false,
      })
    );

    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'mobile_number',
        type: 'varchar',
        length: '15',
        isNullable: false,
      })
    );

    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'village_area',
        type: 'varchar',
        length: '100',
        isNullable: false,
      })
    );

    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'pincode',
        type: 'int',
        length: '20',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'alternate_number',
        type: 'varchar',
        length: '15',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'address',
      new TableColumn({
        name: 'label',
        length: '28',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('address', 'label');
    await queryRunner.dropColumn('address', 'alternate_number');
    await queryRunner.dropColumn('address', 'pincode');
    await queryRunner.dropColumn('address', 'village_area');
    await queryRunner.dropColumn('address', 'mobile_number');
    await queryRunner.dropColumn('address', 'landmark');
    await queryRunner.dropColumn('address', 'house_number');
    await queryRunner.dropColumn('address', 'name');
  }
}
