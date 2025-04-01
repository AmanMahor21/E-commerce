import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class UpdateCartQuantityRequest {
  // @IsNotEmpty()
  // public id: number;

  // @IsNotEmpty()
  // public customerId: number;

  @IsNotEmpty()
  public productId: string;

  @IsNotEmpty()
  public total: number;

  @IsNotEmpty()
  public quantity: number;

  // public status: number;
  // public categorySlug: string;
  // public categoryDescription: string;
}
