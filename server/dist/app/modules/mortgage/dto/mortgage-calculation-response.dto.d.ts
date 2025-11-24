export declare class MortgageCalculationResponseDto {
    monthlyPayment: number;
    totalPayment: number;
    totalOverpaymentAmount: number;
    possibleTaxDeduction: number;
    savingsDueMotherCapital: number;
    recommendedIncome: number;
    mortgagePaymentSchedule: MortgagePaymentSchedule;
}
export type MonthlyMortgagePayments = {
    [month: string]: MortgagePayment;
};
export type MortgagePaymentSchedule = {
    [year: string]: MonthlyMortgagePayments;
};
export type MortgagePayment = {
    totalPayment: number;
    repaymentOfMortgageBody: number;
    repaymentOfMortgageInterest: number;
    mortgageBalance: number;
};
