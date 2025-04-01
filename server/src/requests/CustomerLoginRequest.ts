import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';

export class UserLogin {
  @IsNotEmpty()
  public username: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  public password: string;
}
