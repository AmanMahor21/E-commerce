import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableLiveAddress1685946242614 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'live_address',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    length: '11',
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isPrimary: true,
                    isNullable: false,
                }, {
                    name: 'customer_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: false,
                }, {
                    name: 'ip',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'first_name',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'last_name',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'company',
                    type: 'varchar',
                    length: '32',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'password',
                    type: 'varchar',
                    length: '512',
                    isPrimary: false,
                    isNullable: true,

                }, {
                    name: 'address_1',
                    type: 'varchar',
                    length: '128',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'address_2',
                    type: 'varchar',
                    length: '128',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'postcode',
                    type: 'varchar',
                    length: '10',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'zone_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'city',
                    type: 'varchar',
                    length: '128',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'state',
                    type: 'varchar',
                    length: '128',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'country_id',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'is_active',
                    type: 'int',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'modified_by',
                    type: 'integer',
                    length: '11',
                    isPrimary: false,
                    isNullable: true,
                }, {
                    name: 'created_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                }, {
                    name: 'modified_date',
                    type: 'DATETIME',
                    isPrimary: false,
                    isNullable: true,
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        });
        const tableExist = await queryRunner.hasTable('live_address');
        if (!tableExist) {
            await queryRunner.createTable(table);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // --
    }

}
