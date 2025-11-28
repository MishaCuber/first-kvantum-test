export class MortgageCalculation {
  id: number;
  userId: string;
  mortgageProfileId: number;
  monthlyPayment: number;
  totalPayment: number;
  totalOverpaymentAmount: number;
  possibleTaxDeduction: number;
  savingsDueMotherCapital: number;
  recommendedIncome: number;
  paymentSchedule: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MortgagePayment {
  totalPayment: number;
  repaymentOfMortgageBody: number;
  repaymentOfMortgageInterest: number;
  mortgageBalance: number;
}

export interface MonthlyPayments {
  [month: string]: MortgagePayment;
}

export interface MortgagePaymentSchedule {
  [year: string]: MonthlyPayments;
}