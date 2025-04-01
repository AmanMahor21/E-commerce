import 'reflect-metadata';
import {
  // IsInt,
  IsNotEmpty,
  // MaxLength,
  // ValidateIf,
} from 'class-validator';

export class SendOtp {
  @IsNotEmpty({ message: 'cf_payment_id method is required for card payment' })
  public paymentId: string;

  @IsNotEmpty({ message: 'action is required for card payment' })
  public action: string;

  @IsNotEmpty({ message: 'otp is required for card payment' })
  public otp: string;
}
