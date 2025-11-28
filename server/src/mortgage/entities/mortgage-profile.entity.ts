export class MortgageProfile {
  id: number;
  userId: string;
  propertyPrice: number;
  propertyType: PropertyType;
  downPaymentAmount: number;
  matCapitalAmount: number | null;
  matCapitalIncluded: boolean;
  loanTermYears: number;
  interestRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyType = 
  | 'apartment_in_new_building'
  | 'apartment_in_secondary_building'
  | 'house'
  | 'house_with_land_plot'
  | 'land_plot'
  | 'other';