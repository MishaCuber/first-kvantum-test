export declare const mortgageProfiles: import("drizzle-orm/mysql-core").MySqlTableWithColumns<{
    name: "mortgage_profiles";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "id";
            tableName: "mortgage_profiles";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: true;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        userId: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "user_id";
            tableName: "mortgage_profiles";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        propertyPrice: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "property_price";
            tableName: "mortgage_profiles";
            dataType: "string";
            columnType: "MySqlDecimal";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        propertyType: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "property_type";
            tableName: "mortgage_profiles";
            dataType: "string";
            columnType: "MySqlVarChar";
            data: string;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        downPaymentAmount: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "down_payment_amount";
            tableName: "mortgage_profiles";
            dataType: "string";
            columnType: "MySqlDecimal";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        matCapitalAmount: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "mat_capital_amount";
            tableName: "mortgage_profiles";
            dataType: "string";
            columnType: "MySqlDecimal";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        matCapitalIncluded: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "mat_capital_included";
            tableName: "mortgage_profiles";
            dataType: "boolean";
            columnType: "MySqlBoolean";
            data: boolean;
            driverParam: number | boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        loanTermYears: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "loan_term_years";
            tableName: "mortgage_profiles";
            dataType: "number";
            columnType: "MySqlInt";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        interestRate: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "interest_rate";
            tableName: "mortgage_profiles";
            dataType: "string";
            columnType: "MySqlDecimal";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: import("drizzle-orm/mysql-core").MySqlColumn<{
            name: "created_at";
            tableName: "mortgage_profiles";
            dataType: "date";
            columnType: "MySqlTimestamp";
            data: Date;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "mysql";
}>;
export type MortgageProfile = typeof mortgageProfiles.$inferSelect;
export type NewMortgageProfile = typeof mortgageProfiles.$inferInsert;
export declare enum PropertyType {
    APARTMENT_NEW = "apartment_in_new_building",
    APARTMENT_SECONDARY = "apartment_in_secondary_building",
    HOUSE = "house",
    HOUSE_WITH_LAND = "house_with_land_plot",
    LAND = "land_plot",
    OTHER = "other"
}
