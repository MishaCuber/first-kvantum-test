import { Injectable, Logger } from '@nestjs/common';
import { MortgageCalculation } from '../entities/mortgage-calculation.entity';

@Injectable()
export class MortgageCalculationService {
  private readonly logger = new Logger(MortgageCalculationService.name);

  async create(calculationData: {
    userId: string;
    mortgageProfileId: number;
    monthlyPayment: number;
    totalPayment: number;
    totalOverpaymentAmount: number;
    possibleTaxDeduction: number;
    savingsDueMotherCapital: number;
    recommendedIncome: number;
    paymentSchedule: string;
  }): Promise<MortgageCalculation> {
    try {
      const mortgageCalculation: MortgageCalculation = {
        id: Date.now(),
        ...calculationData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.logger.log(`Mortgage calculation created with ID: ${mortgageCalculation.id}`);
      return mortgageCalculation;
    } catch (error) {
      this.logger.error(`Error creating mortgage calculation: ${error.message}`, error.stack);
      throw error;
    }
  }
}