import { Injectable, Inject } from '@nestjs/common';
import { Database } from '../../../database/schema';
import { CreateMortgageProfileDto } from './dto/create-mortgage-profile.dto';
import { MortgageCalculationResponseDto, MortgagePaymentSchedule } from './dto/mortgage-calculation-response.dto';

@Injectable()
export class MortgageService {
  constructor(
    @Inject('DATABASE') private readonly db: Database,
  ) {}

  async testSimpleQuery() {
    try {
      console.log('🧪 Testing simple database query...');
      const result = await this.db.execute('SELECT 1 as test');
      console.log('✅ Simple query executed successfully');
      return result;
    } catch (error) {
      console.error('❌ Simple query failed:', error);
      throw error;
    }
  }

  async testTableExists() {
    try {
      console.log('🧪 Checking if mortgage_profiles table exists...');
      const result = await this.db.execute('SHOW TABLES LIKE "mortgage_profiles"');
      console.log('✅ Table check completed:', result);
      return result;
    } catch (error) {
      console.error('❌ Table check failed:', error);
      throw error;
    }
  }

  async createMortgageCalculation(
    createDto: CreateMortgageProfileDto,
    userId: string,
  ): Promise<MortgageCalculationResponseDto> {
    console.log('🚀 Starting mortgage calculation for user:', userId);
    console.log('📊 Input data:', createDto);
    
    try {
      console.log('🧮 Calculating mortgage...');
      const calculationResult = this.calculateMortgage(createDto);
      
      console.log('✅ Mortgage calculation completed successfully');
      return calculationResult;

    } catch (error) {
      console.error('❌ Error in mortgage calculation:', error);
      console.error('🔍 Error details:', error.message);
      throw error;
    }
  }

  private calculateMortgage(dto: CreateMortgageProfileDto): MortgageCalculationResponseDto {
    console.log('🧮 Starting mortgage calculation with data:', dto);

    try {
      const matCapitalAmount = dto.matCapitalIncluded ? (dto.matCapitalAmount || 0) : 0;
      const loanAmount = dto.propertyPrice - dto.downPaymentAmount - matCapitalAmount;
      console.log('💰 Loan amount:', loanAmount);

      const totalMonths = dto.loanTermYears * 12;
      console.log('📅 Total months:', totalMonths);

      const monthlyInterestRate = dto.interestRate / 12 / 100;
      console.log('📊 Monthly interest rate:', monthlyInterestRate);

      const monthlyPayment = this.calculateMonthlyPayment(loanAmount, monthlyInterestRate, totalMonths);
      console.log('💳 Monthly payment:', monthlyPayment);

      const totalPayment = monthlyPayment * totalMonths;
      console.log('💵 Total payment:', totalPayment);

      const totalOverpaymentAmount = totalPayment - loanAmount;
      console.log('📈 Total overpayment:', totalOverpaymentAmount);

      const taxDeductionPurchase = Math.min(dto.propertyPrice, 2000000) * 0.13;
      const taxDeductionInterest = Math.min(totalOverpaymentAmount, 3000000) * 0.13;
      const possibleTaxDeduction = taxDeductionPurchase + taxDeductionInterest;
      console.log('🏦 Tax deduction:', possibleTaxDeduction);

      let savingsDueMotherCapital = 0;
      if (dto.matCapitalIncluded && dto.matCapitalAmount) {
        const loanAmountWithoutMC = dto.propertyPrice - dto.downPaymentAmount;
        const monthlyPaymentWithoutMC = this.calculateMonthlyPayment(
          loanAmountWithoutMC,
          monthlyInterestRate,
          totalMonths
        );
        const totalPaymentWithoutMC = monthlyPaymentWithoutMC * totalMonths;
        savingsDueMotherCapital = totalPaymentWithoutMC - totalPayment;
      }
      console.log('👨‍👩‍👧‍👦 Savings from mother capital:', savingsDueMotherCapital);

      const recommendedIncome = monthlyPayment / 0.4;
      console.log('💼 Recommended income:', recommendedIncome);

      console.log('📅 Calculating payment schedule...');
      const mortgagePaymentSchedule = this.calculatePaymentSchedule(
        loanAmount,
        monthlyInterestRate,
        monthlyPayment,
        Math.min(totalMonths, 12) 
      );

      const result = {
        monthlyPayment: this.round(monthlyPayment),
        totalPayment: this.round(totalPayment),
        totalOverpaymentAmount: this.round(totalOverpaymentAmount),
        possibleTaxDeduction: this.round(possibleTaxDeduction),
        savingsDueMotherCapital: this.round(savingsDueMotherCapital),
        recommendedIncome: this.round(recommendedIncome),
        mortgagePaymentSchedule,
      };

      console.log('✅ Calculation completed successfully');
      return result;

    } catch (error) {
      console.error('❌ Error in calculateMortgage:', error);
      throw error;
    }
  }

  private calculateMonthlyPayment(loanAmount: number, monthlyRate: number, totalMonths: number): number {
    if (monthlyRate === 0) {
      return loanAmount / totalMonths;
    }

    try {
      const ratePower = Math.pow(1 + monthlyRate, totalMonths);
      const coefficient = (monthlyRate * ratePower) / (ratePower - 1);
      return loanAmount * coefficient;
    } catch (error) {
      console.error('❌ Error in calculateMonthlyPayment:', error);
      throw new Error(`Failed to calculate monthly payment: ${error.message}`);
    }
  }

  private calculatePaymentSchedule(
    initialLoanAmount: number,
    monthlyRate: number,
    monthlyPayment: number,
    totalMonths: number,
  ): MortgagePaymentSchedule {
    console.log('📊 Generating payment schedule...');
    
    try {
      let balance = initialLoanAmount;
      const schedule: MortgagePaymentSchedule = {};

      for (let month = 1; month <= totalMonths; month++) {
        const year = Math.ceil(month / 12);
        const monthInYear = ((month - 1) % 12) + 1;

        const yearKey = `Year ${year}`;
        const monthKey = `Month ${monthInYear}`;

        const interestPayment = balance * monthlyRate;
        
        const principalPayment = monthlyPayment - interestPayment;
        
        balance -= principalPayment;

        if (!schedule[yearKey]) {
          schedule[yearKey] = {};
        }

        schedule[yearKey][monthKey] = {
          totalPayment: this.round(monthlyPayment),
          repaymentOfMortgageBody: this.round(principalPayment),
          repaymentOfMortgageInterest: this.round(interestPayment),
          mortgageBalance: this.round(Math.max(balance, 0)),
        };
      }

      console.log('✅ Payment schedule generated successfully');
      return schedule;
    } catch (error) {
      console.error('❌ Error in calculatePaymentSchedule:', error);
      throw new Error(`Failed to generate payment schedule: ${error.message}`);
    }
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  async getUserCalculations(userId: string) {
    console.log('📚 Getting calculations for user:', userId);
    
    try {
      return { 
        message: 'Database queries temporarily disabled',
        userId: userId
      };
    } catch (error) {
      console.error('❌ Error in getUserCalculations:', error);
      throw error;
    }
  }
}