import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsString()
  readonly confirmPassword?: string;

  @IsOptional()
  @IsArray()
  screenProgress?: {
    screen: number;
    point: number;
  }[];
}
