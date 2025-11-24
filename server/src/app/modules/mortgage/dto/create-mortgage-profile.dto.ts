import { IsNumber, IsEnum, IsBoolean, IsOptional, Min, Max } from 'class-validator';
import { PropertyType } from '../schemas/mortgage-profiles';

export class CreateMortgageProfileDto {
  @IsNumber()
  @Min(100000)
  propertyPrice: number;

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsNumber()
  @Min(0)
  downPaymentAmount: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  matCapitalAmount?: number | null;

  @IsBoolean()
  matCapitalIncluded: boolean;

  @IsNumber()
  @Min(1)
  @Max(30)
  loanTermYears: number;

  @IsNumber()
  @Min(1)
  @Max(20)
  interestRate: number;
}