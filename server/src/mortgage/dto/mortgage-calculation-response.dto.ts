import { MortgagePaymentSchedule } from '../entities/mortgage-calculation.entity';

export class MortgageCalculationResponseDto {
  monthlyPayment: number;
  totalPayment: number;
  totalOverpaymentAmount: number;
  possibleTaxDeduction: number;
  savingsDueMotherCapital: number;
  recommendedIncome: number;
  mortgagePaymentSchedule: MortgagePaymentSchedule;
}