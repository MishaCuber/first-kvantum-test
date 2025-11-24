import { Controller, Post, Body, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { MortgageService } from './mortgage.service';
import { CreateMortgageProfileDto } from './dto/create-mortgage-profile.dto';
import { MortgageCalculationResponseDto } from './dto/mortgage-calculation-response.dto';
import { PropertyType } from './schemas/mortgage-profiles';
import { RtfGeneratorService } from './rtf-generator.service';

@Controller('mortgage-profiles')
export class MortgageController {
  constructor(private readonly mortgageService: MortgageService, private readonly rtfGenerator: RtfGeneratorService,) {}

  @Get('test-db')
  async testDatabase() {
    try {
      console.log('🧪 Starting database tests...');
      
      const simpleTest = await this.mortgageService.testSimpleQuery();
      console.log('✅ Simple query test passed');
      
      const tableTest = await this.mortgageService.testTableExists();
      console.log('✅ Table check test passed');
      
      return { 
        status: 'success', 
        message: 'Database tests passed (Drizzle disabled)',
        tests: {
          simpleQuery: simpleTest,
          tableExists: tableTest
        }
      };
    } catch (error) {
      console.error('❌ Database test failed:', error);
      return { 
        status: 'error', 
        message: 'Database test failed',
        error: error.message
      };
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createMortgageProfile(
    @Body() createDto: CreateMortgageProfileDto,
  ): Promise<MortgageCalculationResponseDto> {
    console.log('📨 Received POST request:', createDto);
    
    try {
      const userId = 'demo-user-id';
      return await this.mortgageService.createMortgageCalculation(createDto, userId);
    } catch (error) {
      console.error('❌ Error in controller:', error);
      throw error;
    }
  }

  @Get('test-simple')
async testSimpleCalculation() {
  try {
    const testData: CreateMortgageProfileDto = {
      propertyPrice: 5000000,
      propertyType: PropertyType.APARTMENT_NEW, 
      downPaymentAmount: 1000000,
      matCapitalAmount: 450000,
      matCapitalIncluded: true,
      loanTermYears: 20,
      interestRate: 7.5
    };
    
    const result = await this.mortgageService.createMortgageCalculation(testData, 'test-user');
    return {
      status: 'success',
      message: 'Simple calculation test passed',
      data: result
    };
  } catch (error) {
    return {
      status: 'error',
      message: 'Simple calculation test failed',
      error: error.message
    };
  }
}

  @Get('user/:userId')
  async getUserCalculations(@Param('userId') userId: string) {
    try {
      return await this.mortgageService.getUserCalculations(userId);
    } catch (error) {
      console.error('❌ Error getting user calculations:', error);
      throw error;
    }
  }

  @Get('test-schedule')
async testSchedule() {
  try {
    const testData: CreateMortgageProfileDto = {
      propertyPrice: 5000000,
      propertyType: PropertyType.APARTMENT_NEW,
      downPaymentAmount: 1000000,
      matCapitalAmount: 450000,
      matCapitalIncluded: true,
      loanTermYears: 20,
      interestRate: 7.5
    };
    
    const result = await this.mortgageService.createMortgageCalculation(testData, 'test-user');
    
    // Вернем только график платежей для проверки
    return {
      status: 'success',
      schedule: result.mortgagePaymentSchedule
    };
  } catch (error) {
    return {
      status: 'error',
      error: error.message
    };
  }
}



@Get('generate-rtf/:calculationId')
async generateRTF(@Param('calculationId') calculationId: string) {
  try {
    const testData: CreateMortgageProfileDto = {
      propertyPrice: 5000000,
      propertyType: PropertyType.APARTMENT_NEW,
      downPaymentAmount: 1000000,
      matCapitalAmount: 450000,
      matCapitalIncluded: true,
      loanTermYears: 20,
      interestRate: 7.5
    };
    
    const calculation = await this.mortgageService.createMortgageCalculation(testData, 'test-user');
    
    const rtfContent = this.rtfGenerator.generateMortgageRTF(calculation, testData, 'test-user');
    
    this.rtfGenerator.saveRTFToFile(rtfContent, `mortgage_calculation_${calculationId}.rtf`);
    
    return {
      status: 'success',
      message: 'RTF документ сгенерирован',
      filename: `mortgage_calculation_${calculationId}.rtf`,
      downloadUrl: `/api/mortgage-profiles/download-rtf/${calculationId}`
    };
  } catch (error) {
    return {
      status: 'error',
      error: error.message
    };
  }
}
}


