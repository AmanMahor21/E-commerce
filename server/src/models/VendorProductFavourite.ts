import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import { Exclude } from 'class-transformer';
import { Product } from './ProductModel';
import { Vendor } from './Vendor';

@Entity('vendor_product_favorite')
export class VendorProductFavorites extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'product_favorite_id' })
  @IsNotEmpty()
  public productFavoriteId: number;

  @IsNotEmpty()
  @Exclude()
  @Column({ name: 'product_id' })
  public productId: number;

  @IsNotEmpty()
  @Exclude()
  @Column({ name: 'vendor_id' })
  public vendorId: number;

  @ManyToOne((type) => Vendor, (vendor) => vendor.vendorProductFavorites)
  @JoinColumn({ name: 'vendor_id' })
  public vendor: Vendor;

  @ManyToOne((type) => Product, (product) => product.vendorProductFavorites)
  @JoinColumn({ name: 'product_id' })
  public product: Product;
}
