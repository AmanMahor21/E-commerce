import 'reflect-metadata';
import {
  // IsInt,
  IsNotEmpty,
  IsOptional,
  // IsOptional,
  // MaxLength,
  // ValidateIf,
} from 'class-validator';

export class CreatePayment {
  @IsOptional()
  @IsNotEmpty({ message: 'upiID is required' })
  public upiID: string;

  @IsNotEmpty({ message: 'amount is required' })
  public amount: number;
}
