"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mortgageCalculations = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.mortgageCalculations = (0, mysql_core_1.mysqlTable)('mortgage_calculations', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    userId: (0, mysql_core_1.varchar)('user_id', { length: 36 }).notNull(),
    mortgageProfileId: (0, mysql_core_1.int)('mortgage_profile_id').notNull(),
    monthlyPayment: (0, mysql_core_1.decimal)('monthly_payment', { precision: 15, scale: 2 }).notNull(),
    totalPayment: (0, mysql_core_1.decimal)('total_payment', { precision: 15, scale: 2 }).notNull(),
    totalOverpaymentAmount: (0, mysql_core_1.decimal)('total_overpayment_amount', { precision: 15, scale: 2 }).notNull(),
    possibleTaxDeduction: (0, mysql_core_1.decimal)('possible_tax_deduction', { precision: 15, scale: 2 }).notNull(),
    savingsDueMotherCapital: (0, mysql_core_1.decimal)('savings_due_mother_capital', { precision: 15, scale: 2 }).notNull(),
    recommendedIncome: (0, mysql_core_1.decimal)('recommended_income', { precision: 15, scale: 2 }).notNull(),
    paymentSchedule: (0, mysql_core_1.json)('payment_schedule').notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
});
//# sourceMappingURL=mortgage-calculations.js.map