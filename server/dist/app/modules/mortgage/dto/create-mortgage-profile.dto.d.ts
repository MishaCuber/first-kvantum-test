import { PropertyType } from '../schemas/mortgage-profiles';
export declare class CreateMortgageProfileDto {
    propertyPrice: number;
    propertyType: PropertyType;
    downPaymentAmount: number;
    matCapitalAmount?: number | null;
    matCapitalIncluded: boolean;
    loanTermYears: number;
    interestRate: number;
}
