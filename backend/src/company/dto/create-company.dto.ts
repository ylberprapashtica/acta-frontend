import { IsString, IsEnum, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';
import { BusinessType } from '../entities/company.entity';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsString()
  @IsNotEmpty()
  tradeName: string;

  @IsEnum(BusinessType)
  businessType: BusinessType;

  @IsString()
  @IsNotEmpty()
  uniqueIdentificationNumber: string;

  @IsString()
  @IsNotEmpty()
  businessNumber: string;

  @IsString()
  @IsNotEmpty()
  fiscalNumber: string;

  @IsString()
  @IsNotEmpty()
  vatNumber: string;

  @IsDateString()
  registrationDate: Date;

  @IsString()
  @IsNotEmpty()
  municipality: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  bankAccount: string;
} 