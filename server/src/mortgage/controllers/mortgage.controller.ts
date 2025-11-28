import { Controller, Post, Body, Logger, Get } from '@nestjs/common';
import { CreateMortgageProfileDto } from '../dto/create-mortgage-profile.dto';
import { MortgageCalculationResponseDto } from '../dto/mortgage-calculation-response.dto';
import { MortgageProfileService } from '../services/mortgage-profile.service';
import { MortgageCalculationService } from '../services/mortgage-calculation.service';
import { MortgagePaymentCalculatorService } from '../services/mortgage-payment-calculator.service';
import { PropertyType } from '../entities/mortgage-profile.entity';

@Controller('mortgage-profiles')
export class MortgageController {
  private readonly logger = new Logger(MortgageController.name);

  constructor(
    private readonly mortgageProfileService: MortgageProfileService,
    private readonly mortgageCalculationService: MortgageCalculationService,
    private readonly paymentCalculatorService: MortgagePaymentCalculatorService,
  ) {}

  @Get()
  getTest() {
    return { 
      message: 'Mortgage API is working!',
      timestamp: new Date().toISOString(),
      status: 'success'
    };
  }

  @Post()
  async createMortgageCalculation(
    @Body() createMortgageDto: CreateMortgageProfileDto,
  ): Promise<MortgageCalculationResponseDto> {
    const userId = 'test-user';
    
    try {
      this.logger.log(`Creating mortgage calculation for user: ${userId}`);

      const profileData = {
        userId,
        propertyPrice: createMortgageDto.propertyPrice,
        propertyType: createMortgageDto.propertyType,
        downPaymentAmount: createMortgageDto.downPaymentAmount,
        matCapitalAmount: createMortgageDto.matCapitalAmount ?? null,
        matCapitalIncluded: createMortgageDto.matCapitalIncluded,
        loanTermYears: createMortgageDto.loanTermYears,
        interestRate: createMortgageDto.interestRate,
      };

      const mortgageProfile = await this.mortgageProfileService.create(profileData);

      const calculationResult = await this.paymentCalculatorService.calculateMortgage(
        mortgageProfile,
        createMortgageDto
      );

      await this.mortgageCalculationService.create({
        ...calculationResult,
        userId,
        mortgageProfileId: mortgageProfile.id,
        paymentSchedule: JSON.stringify(calculationResult.mortgagePaymentSchedule),
      });

      this.logger.log('Mortgage calculation created successfully');
      return calculationResult;

    } catch (error) {
      this.logger.error(`Error: ${error.message}`);
      throw error;
    }
  }
}