// src/auth/dto/register.dto.ts
import { IsEmail, IsString, MinLength, IsOptional, IsArray } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsArray()
  roles?: string[];
}
