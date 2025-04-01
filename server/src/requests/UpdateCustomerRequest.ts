import 'reflect-metadata';
import { IsEmail, MaxLength, MinLength, IsOptional } from 'class-validator';
export class UpdateCustomer {
  // @IsNotEmpty()
  public customerGroupId: number;
  @IsOptional()
  @MaxLength(96, {
    message: 'user should be maximum 96 characters',
  })
  // @IsNotEmpty()
  public username: string;
  @IsOptional()
  @MaxLength(96, {
    message: 'email should be maximum 96 characters',
  })
  @IsEmail()
  public email: string;
  @IsOptional()
  @MaxLength(15, {
    message: 'mobile number should be maximum 15 characters',
  })
  // @IsNotEmpty({message: mobile number is required})
  @IsOptional()
  @MinLength(6, {
    message: 'mobile number should be minimum 6 character',
  })
  public mobileNumber: number;

  public password: string;

  public confirmPassword: string;

  public avatar: string;

  public newsletter: number;

  public realName: string;

  public customerNo: string;

  // @IsNotEmpty()
  public mailStatus: number;
  // @IsNotEmpty({
  //     message: 'status is required',
  // })
  public status: number;

  // @IsNotEmpty()
  public siteId: number;

  public lastName: string;
}
