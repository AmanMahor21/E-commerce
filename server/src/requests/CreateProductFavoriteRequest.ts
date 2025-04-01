import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class CreateProductFavoriteRequest {
  @IsNotEmpty({
    message: 'productId is required',
  })
  public productId: number;
}
