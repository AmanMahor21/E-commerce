import 'reflect-metadata';
import {
  // IsInt,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
  // MaxLength,
  // ValidateIf,
} from 'class-validator';

export class OrderPay {
  @IsNotEmpty({ message: 'Payment method is required' })
  public paymentMethod: 'upi' | 'card';

  @IsNotEmpty({ message: 'payment_session_id is required' })
  public sessionId: string;

  @IsOptional()
  @IsNotEmpty({ message: 'upi_id is required for UPI payment' })
  @ValidateIf((obj) => obj.paymentMethod === 'upi')
  public upiId: string;

  @IsOptional()
  @IsNotEmpty({ message: 'card_number is required for card payment' })
  @ValidateIf((obj) => obj.paymentMethod === 'card')
  public cardNumber: string;

  @IsOptional()
  @IsNotEmpty({ message: 'expiry_month is required for card payment' })
  @ValidateIf((obj) => obj.paymentMethod === 'card')
  public expiryMonth: string;

  @IsOptional()
  @IsNotEmpty({ message: 'expiry_year is required for card payment' })
  @ValidateIf((obj) => obj.paymentMethod === 'card')
  public expiryYear: string;

  @IsOptional()
  @IsNotEmpty({ message: 'cvv is required for card payment' })
  @ValidateIf((obj) => obj.paymentMethod === 'card')
  public cvv: string;
}
