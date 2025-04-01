import 'reflect-metadata';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateCustomerEmailRequest {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public otp: number;
}
