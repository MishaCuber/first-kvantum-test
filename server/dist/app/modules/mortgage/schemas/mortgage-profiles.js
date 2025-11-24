"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyType = exports.mortgageProfiles = void 0;
const mysql_core_1 = require("drizzle-orm/mysql-core");
exports.mortgageProfiles = (0, mysql_core_1.mysqlTable)('mortgage_profiles', {
    id: (0, mysql_core_1.int)('id').primaryKey().autoincrement(),
    userId: (0, mysql_core_1.varchar)('user_id', { length: 36 }).notNull(),
    propertyPrice: (0, mysql_core_1.decimal)('property_price', { precision: 15, scale: 2 }).notNull(),
    propertyType: (0, mysql_core_1.varchar)('property_type', { length: 50 }).notNull(),
    downPaymentAmount: (0, mysql_core_1.decimal)('down_payment_amount', { precision: 15, scale: 2 }).notNull(),
    matCapitalAmount: (0, mysql_core_1.decimal)('mat_capital_amount', { precision: 15, scale: 2 }),
    matCapitalIncluded: (0, mysql_core_1.boolean)('mat_capital_included').notNull().default(false),
    loanTermYears: (0, mysql_core_1.int)('loan_term_years').notNull(),
    interestRate: (0, mysql_core_1.decimal)('interest_rate', { precision: 5, scale: 2 }).notNull(),
    createdAt: (0, mysql_core_1.timestamp)('created_at').defaultNow(),
});
var PropertyType;
(function (PropertyType) {
    PropertyType["APARTMENT_NEW"] = "apartment_in_new_building";
    PropertyType["APARTMENT_SECONDARY"] = "apartment_in_secondary_building";
    PropertyType["HOUSE"] = "house";
    PropertyType["HOUSE_WITH_LAND"] = "house_with_land_plot";
    PropertyType["LAND"] = "land_plot";
    PropertyType["OTHER"] = "other";
})(PropertyType || (exports.PropertyType = PropertyType = {}));
//# sourceMappingURL=mortgage-profiles.js.map