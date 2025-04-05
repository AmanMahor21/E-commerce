import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './ProductModel';
import { IsNotEmpty } from 'class-validator';
import { BaseModel } from './BaseModel';
import { OrderProduct } from './OrderProduct';

@Entity('product_rating')
export class ProductRating extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'rating_id' })
  ratingId: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  //   @IsNotEmpty()
  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'order_product_id' })
  OrderProductId: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'review' })
  review: string;

  @Column({ name: 'rating' })
  rating: number;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'image_path' })
  imagePath: string;

  @Column({ name: 'video_path' })
  videoPath: string;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'video' })
  video: string;

  @ManyToOne((type) => Product, (product) => product.productRating)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne((type) => OrderProduct, (orderProduct) => orderProduct.productRating)
  @JoinColumn({ name: 'product_id' })
  orderProduct: OrderProduct;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'order_product_id' })
  orderProductId: number;
}
