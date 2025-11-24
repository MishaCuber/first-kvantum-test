import { mysqlTable, int, decimal, varchar, boolean, timestamp } from 'drizzle-orm/mysql-core';

export const mortgageProfiles = mysqlTable('mortgage_profiles', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  propertyPrice: decimal('property_price', { precision: 15, scale: 2 }).notNull(),
  propertyType: varchar('property_type', { length: 50 }).notNull(),
  downPaymentAmount: decimal('down_payment_amount', { precision: 15, scale: 2 }).notNull(),
  matCapitalAmount: decimal('mat_capital_amount', { precision: 15, scale: 2 }),
  matCapitalIncluded: boolean('mat_capital_included').notNull().default(false),
  loanTermYears: int('loan_term_years').notNull(),
  interestRate: decimal('interest_rate', { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type MortgageProfile = typeof mortgageProfiles.$inferSelect;
export type NewMortgageProfile = typeof mortgageProfiles.$inferInsert;

export enum PropertyType {
  APARTMENT_NEW = 'apartment_in_new_building',
  APARTMENT_SECONDARY = 'apartment_in_secondary_building',
  HOUSE = 'house',
  HOUSE_WITH_LAND = 'house_with_land_plot',
  LAND = 'land_plot',
  OTHER = 'other'
}