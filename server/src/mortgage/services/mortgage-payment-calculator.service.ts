import { Injectable, Logger } from '@nestjs/common';
import { MortgageProfile } from '../entities/mortgage-profile.entity';
import { CreateMortgageProfileDto } from '../dto/create-mortgage-profile.dto';
import { MortgageCalculationResponseDto } from '../dto/mortgage-calculation-response.dto';
import { MortgagePaymentSchedule, MortgagePayment } from '../entities/mortgage-calculation.entity';

@Injectable()
export class MortgagePaymentCalculatorService {
  private readonly logger = new Logger(MortgagePaymentCalculatorService.name);

  async calculateMortgage(
    profile: MortgageProfile,
    dto: CreateMortgageProfileDto,
  ): Promise<MortgageCalculationResponseDto> {
    try {
      // Основные расчеты
      const loanAmount = this.calculateLoanAmount(dto);
      const monthlyPayment = this.calculateMonthlyPayment(loanAmount, dto);
      const totalMonths = dto.loanTermYears * 12;
      
      // Расчет графика платежей
      const paymentSchedule = this.calculatePaymentSchedule(
        loanAmount,
        monthlyPayment,
        dto.interestRate,
        totalMonths
      );

      // Дополнительные расчеты
      const totalPayment = this.calculateTotalPayment(monthlyPayment, totalMonths);
      const totalOverpaymentAmount = this.calculateTotalOverpayment(totalPayment, loanAmount);
      const possibleTaxDeduction = this.calculateTaxDeduction(dto.propertyPrice);
      
      // Исправляем вызов метода с правильными параметрами
      const savingsDueMotherCapital = this.calculateMotherCapitalSavings(
        dto.matCapitalIncluded, 
        dto.matCapitalAmount ?? null
      );
      
      const recommendedIncome = this.calculateRecommendedIncome(monthlyPayment);

      this.logger.log(`Mortgage calculation completed for profile ID: ${profile.id}`);

      return {
        monthlyPayment: this.roundToTwoDecimals(monthlyPayment),
        totalPayment: this.roundToTwoDecimals(totalPayment),
        totalOverpaymentAmount: this.roundToTwoDecimals(totalOverpaymentAmount),
        possibleTaxDeduction: this.roundToTwoDecimals(possibleTaxDeduction),
        savingsDueMotherCapital: this.roundToTwoDecimals(savingsDueMotherCapital),
        recommendedIncome: this.roundToTwoDecimals(recommendedIncome),
        mortgagePaymentSchedule: paymentSchedule,
      };
    } catch (error) {
      this.logger.error(`Error calculating mortgage: ${error.message}`, error.stack);
      throw error;
    }
  }

  private calculateLoanAmount(dto: CreateMortgageProfileDto): number {
    let loanAmount = dto.propertyPrice - dto.downPaymentAmount;
    
    if (dto.matCapitalIncluded && dto.matCapitalAmount) {
      loanAmount -= dto.matCapitalAmount;
    }

    return Math.max(0, loanAmount);
  }

  private calculateMonthlyPayment(loanAmount: number, dto: CreateMortgageProfileDto): number {
    if (loanAmount <= 0) return 0;

    const monthlyRate = dto.interestRate / 100 / 12;
    const totalMonths = dto.loanTermYears * 12;

    const annuityCoefficient = (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                              (Math.pow(1 + monthlyRate, totalMonths) - 1);

    return loanAmount * annuityCoefficient;
  }

  private calculatePaymentSchedule(
    initialLoanAmount: number,
    monthlyPayment: number,
    annualInterestRate: number,
    totalMonths: number,
  ): MortgagePaymentSchedule {
    const schedule: MortgagePaymentSchedule = {};
    let remainingBalance = initialLoanAmount;
    const monthlyRate = annualInterestRate / 100 / 12;

    for (let month = 1; month <= totalMonths; month++) {
      const year = Math.ceil(month / 12);
      const monthInYear = ((month - 1) % 12) + 1;

      if (!schedule[year]) {
        schedule[year] = {};
      }

      const interestPayment = remainingBalance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment;
      
      if (month === totalMonths || principalPayment > remainingBalance) {
        principalPayment = remainingBalance;
      }

      remainingBalance -= principalPayment;
      
      if (remainingBalance < 0) {
        remainingBalance = 0;
      }

      const payment: MortgagePayment = {
        totalPayment: this.roundToTwoDecimals(monthlyPayment),
        repaymentOfMortgageBody: this.roundToTwoDecimals(principalPayment),
        repaymentOfMortgageInterest: this.roundToTwoDecimals(interestPayment),
        mortgageBalance: this.roundToTwoDecimals(Math.max(0, remainingBalance)),
      };

      schedule[year][`month_${monthInYear}`] = payment;

      if (remainingBalance <= 0) {
        break;
      }
    }

    return schedule;
  }

  private calculateTotalPayment(monthlyPayment: number, totalMonths: number): number {
    return monthlyPayment * totalMonths;
  }

  private calculateTotalOverpayment(totalPayment: number, loanAmount: number): number {
    return Math.max(0, totalPayment - loanAmount);
  }

  private calculateTaxDeduction(propertyPrice: number): number {
    const maxDeductionAmount = 2000000 * 0.13;
    const actualDeduction = propertyPrice * 0.13;
    return Math.min(actualDeduction, maxDeductionAmount);
  }

  private calculateMotherCapitalSavings(
    matCapitalIncluded: boolean, 
    matCapitalAmount: number | null
  ): number {
    if (matCapitalIncluded && matCapitalAmount) {
      return matCapitalAmount;
    }
    return 0;
  }

  private calculateRecommendedIncome(monthlyPayment: number): number {
    return monthlyPayment * 2.5;
  }

  private roundToTwoDecimals(value: number): number {
    return Math.round(value * 100) / 100;
  }
}