import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class AddproductToCart {
  // @IsNotEmpty()
  // public id: number;

  // @IsNotEmpty()
  // public customerId: number;

  @IsNotEmpty()
  public productId: number;

  @IsNotEmpty()
  public name: string;
  @IsNotEmpty()
  public productPrice: string;

  @IsNotEmpty()
  public total: number;

  @IsNotEmpty()
  public quantity: string;

  // public status: number;
  // public categorySlug: string;
  // public categoryDescription: string;
}
