import { mysqlTable, int, decimal, varchar, json, timestamp } from 'drizzle-orm/mysql-core';

export const mortgageCalculations = mysqlTable('mortgage_calculations', {
  id: int('id').primaryKey().autoincrement(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  mortgageProfileId: int('mortgage_profile_id').notNull(),
  monthlyPayment: decimal('monthly_payment', { precision: 15, scale: 2 }).notNull(),
  totalPayment: decimal('total_payment', { precision: 15, scale: 2 }).notNull(),
  totalOverpaymentAmount: decimal('total_overpayment_amount', { precision: 15, scale: 2 }).notNull(),
  possibleTaxDeduction: decimal('possible_tax_deduction', { precision: 15, scale: 2 }).notNull(),
  savingsDueMotherCapital: decimal('savings_due_mother_capital', { precision: 15, scale: 2 }).notNull(),
  recommendedIncome: decimal('recommended_income', { precision: 15, scale: 2 }).notNull(),
  paymentSchedule: json('payment_schedule').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type MortgageCalculation = typeof mortgageCalculations.$inferSelect;
export type NewMortgageCalculation = typeof mortgageCalculations.$inferInsert;