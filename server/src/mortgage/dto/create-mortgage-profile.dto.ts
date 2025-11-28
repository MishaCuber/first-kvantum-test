import { IsEnum, IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';
import { PropertyType } from '../entities/mortgage-profile.entity';

export class CreateMortgageProfileDto {
  @IsNumber()
  @Min(100000, { message: 'Стоимость недвижимости должна быть не менее 100,000 руб.' })
  propertyPrice: number;

  @IsEnum(['apartment_in_new_building', 'apartment_in_secondary_building', 'house', 'house_with_land_plot', 'land_plot', 'other'], {
    message: 'Неверный тип недвижимости'
  })
  propertyType: PropertyType; // Используем конкретный тип

  @IsNumber()
  @Min(0, { message: 'Первоначальный взнос не может быть отрицательным' })
  downPaymentAmount: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Сумма мат. капитала не может быть отрицательной' })
  matCapitalAmount?: number | null;

  @IsBoolean()
  matCapitalIncluded: boolean;

  @IsNumber()
  @Min(1, { message: 'Срок кредита должен быть не менее 1 года' })
  @Max(30, { message: 'Срок кредита не может превышать 30 лет' })
  loanTermYears: number;

  @IsNumber()
  @Min(1, { message: 'Процентная ставка должна быть не менее 1%' })
  @Max(20, { message: 'Процентная ставка не может превышать 20%' })
  interestRate: number;
}