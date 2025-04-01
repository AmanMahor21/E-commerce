import 'reflect-metadata';
import {
  IsInt,
  // IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  ValidateIf,
  // IsOptional,
  // MaxLength,
  // ValidateIf,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateAddress {
  @IsNotEmpty({ message: 'name is required' })
  public name: string;

  @IsNotEmpty({ message: 'house/flat number is required' })
  public houseNumber: number;

  @IsNotEmpty({ message: 'landmark is required' })
  public landmark: string;

  @IsNotEmpty({ message: 'mobile number is required' })
  public mobileNumber: number;

  @IsNotEmpty({ message: 'village/Area is required' })
  public villageArea: string;

  @IsNotEmpty({ message: 'city is required' })
  public city: string;

  @IsNotEmpty({ message: 'pincode is required' })
  public pincode: number;

  @IsNotEmpty({ message: 'state is required' })
  public state: string;

  @IsNotEmpty({ message: 'alternate Number is required' })
  public alternateNumber: number;

  @IsNotEmpty({ message: 'label is required' })
  public label: string;

  @IsNotEmpty({ message: 'isDefault is required' })
  public isDefault: number;
  // @IsNotEmpty()
  public customerId: number;

  @IsOptional()
  @Exclude()
  @MaxLength(128, {
    message: 'address1 should be maximum 128 characters',
  })
  @IsNotEmpty({
    message: 'address1 is required',
  })
  public address1: string;

  @IsOptional()
  @Exclude()
  @MaxLength(128, {
    message: 'address2 should be maximum 128 characters',
  })
  public address2: string;

  // @IsOptional()
  // @Exclude()
  // @MaxLength(128, {
  //   message: 'city should be maximum 128 characters',
  // })
  // @IsNotEmpty({
  //   message: 'city is required',
  // })

  // public city: string;

  // public state: string;

  @IsOptional()
  @Exclude()
  @MaxLength(10, {
    message: 'postcode should be maximum 6 characters',
  })
  @ValidateIf((o) => o.postcode !== '')
  public postcode: number;

  @IsOptional()
  @Exclude()
  @IsNotEmpty()
  public addressType: number;

  @IsOptional()
  @Exclude()
  @IsInt()
  public countryId: number;
  @MaxLength(32, {
    message: 'company should be maximum 32 character',
  })
  @IsOptional()
  @Exclude()
  public company: string;

  @Exclude()
  @IsOptional()
  public zoneId: number;

  @Exclude()
  @IsOptional()
  public firstName: string;

  public lastName: string;

  @IsOptional()
  @Exclude()
  public phoneNumber: number;
  // @Exclude()
  // @IsOptional()
  // public landmark: string;
}
