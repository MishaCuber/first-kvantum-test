import { mysqlTable, int, decimal, boolean, varchar, text, timestamp } from 'drizzle-orm/mysql-core';

export const mortgageProfiles = mysqlTable('mortgage_profiles', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('userId', { length: 255 }).notNull(),
  propertyPrice: decimal('propertyPrice', { precision: 15, scale: 2 }).notNull(),
  propertyType: varchar('propertyType', { length: 50 }).notNull(),
  downPaymentAmount: decimal('downPaymentAmount', { precision: 15, scale: 2 }).notNull(),
  matCapitalAmount: decimal('matCapitalAmount', { precision: 15, scale: 2 }),
  matCapitalIncluded: boolean('matCapitalIncluded').default(false),
  loanTermYears: int('loanTermYears').notNull(),
  interestRate: decimal('interestRate', { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});

export const mortgageCalculations = mysqlTable('mortgage_calculations', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('userId', { length: 255 }).notNull(),
  mortgageProfileId: int('mortgageProfileId').notNull(),
  monthlyPayment: decimal('monthlyPayment', { precision: 15, scale: 2 }).notNull(),
  totalPayment: decimal('totalPayment', { precision: 15, scale: 2 }).notNull(),
  totalOverpaymentAmount: decimal('totalOverpaymentAmount', { precision: 15, scale: 2 }).notNull(),
  possibleTaxDeduction: decimal('possibleTaxDeduction', { precision: 15, scale: 2 }).notNull(),
  savingsDueMotherCapital: decimal('savingsDueMotherCapital', { precision: 15, scale: 2 }).notNull(),
  recommendedIncome: decimal('recommendedIncome', { precision: 15, scale: 2 }).notNull(),
  paymentSchedule: text('paymentSchedule').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow(),
});