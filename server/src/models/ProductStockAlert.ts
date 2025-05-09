import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment');

@Entity('product_stock_alert')
export class ProductStockAlert extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    @IsNotEmpty()
    public id: number;
    @IsNotEmpty()
    @Column({ name: 'product_id' })
    public productId: number;

    @Column({ name: 'mail_flag' })
    public mailFlag: number;

    @Column({ name: 'sku_name' })
    public skuName: string;

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
