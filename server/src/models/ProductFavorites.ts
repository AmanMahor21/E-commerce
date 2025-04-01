import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './BaseModel';
import { Exclude } from 'class-transformer';
import { Product } from './ProductModel';
import { Customer } from './Customer';

@Entity('product_favorite')
export class ProductFavorites extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'product_favorite_id' })
  @IsNotEmpty()
  public productFavoriteId: number;

  @IsNotEmpty()
  @Exclude()
  @Column({ name: 'product_id' })
  public productId: number;

  @IsNotEmpty()
  @Exclude()
  @Column({ name: 'customer_id' })
  public customerId: number;

  @ManyToOne((type) => Customer, (customer) => customer.productFavorites)
  @JoinColumn({ name: 'customer_id' })
  public customer: Customer;

  @ManyToOne((type) => Product, (product) => product.productFavorites)
  @JoinColumn({ name: 'product_id' })
  public product: Product;
}
