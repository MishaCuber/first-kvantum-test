"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MortgageService = void 0;
const common_1 = require("@nestjs/common");
let MortgageService = class MortgageService {
    constructor(db) {
        this.db = db;
    }
    async testSimpleQuery() {
        try {
            console.log('🧪 Testing simple database query...');
            const result = await this.db.execute('SELECT 1 as test');
            console.log('✅ Simple query executed successfully');
            return result;
        }
        catch (error) {
            console.error('❌ Simple query failed:', error);
            throw error;
        }
    }
    async testTableExists() {
        try {
            console.log('🧪 Checking if mortgage_profiles table exists...');
            const result = await this.db.execute('SHOW TABLES LIKE "mortgage_profiles"');
            console.log('✅ Table check completed:', result);
            return result;
        }
        catch (error) {
            console.error('❌ Table check failed:', error);
            throw error;
        }
    }
    async createMortgageCalculation(createDto, userId) {
        console.log('🚀 Starting mortgage calculation for user:', userId);
        console.log('📊 Input data:', createDto);
        try {
            console.log('🧮 Calculating mortgage...');
            const calculationResult = this.calculateMortgage(createDto);
            console.log('✅ Mortgage calculation completed successfully');
            return calculationResult;
        }
        catch (error) {
            console.error('❌ Error in mortgage calculation:', error);
            console.error('🔍 Error details:', error.message);
            throw error;
        }
    }
    calculateMortgage(dto) {
        console.log('🧮 Starting mortgage calculation with data:', dto);
        try {
            const matCapitalAmount = dto.matCapitalIncluded ? (dto.matCapitalAmount || 0) : 0;
            const loanAmount = dto.propertyPrice - dto.downPaymentAmount - matCapitalAmount;
            console.log('💰 Loan amount:', loanAmount);
            const totalMonths = dto.loanTermYears * 12;
            console.log('📅 Total months:', totalMonths);
            const monthlyInterestRate = dto.interestRate / 12 / 100;
            console.log('📊 Monthly interest rate:', monthlyInterestRate);
            const monthlyPayment = this.calculateMonthlyPayment(loanAmount, monthlyInterestRate, totalMonths);
            console.log('💳 Monthly payment:', monthlyPayment);
            const totalPayment = monthlyPayment * totalMonths;
            console.log('💵 Total payment:', totalPayment);
            const totalOverpaymentAmount = totalPayment - loanAmount;
            console.log('📈 Total overpayment:', totalOverpaymentAmount);
            const taxDeductionPurchase = Math.min(dto.propertyPrice, 2000000) * 0.13;
            const taxDeductionInterest = Math.min(totalOverpaymentAmount, 3000000) * 0.13;
            const possibleTaxDeduction = taxDeductionPurchase + taxDeductionInterest;
            console.log('🏦 Tax deduction:', possibleTaxDeduction);
            let savingsDueMotherCapital = 0;
            if (dto.matCapitalIncluded && dto.matCapitalAmount) {
                const loanAmountWithoutMC = dto.propertyPrice - dto.downPaymentAmount;
                const monthlyPaymentWithoutMC = this.calculateMonthlyPayment(loanAmountWithoutMC, monthlyInterestRate, totalMonths);
                const totalPaymentWithoutMC = monthlyPaymentWithoutMC * totalMonths;
                savingsDueMotherCapital = totalPaymentWithoutMC - totalPayment;
            }
            console.log('👨‍👩‍👧‍👦 Savings from mother capital:', savingsDueMotherCapital);
            const recommendedIncome = monthlyPayment / 0.4;
            console.log('💼 Recommended income:', recommendedIncome);
            console.log('📅 Calculating payment schedule...');
            const mortgagePaymentSchedule = this.calculatePaymentSchedule(loanAmount, monthlyInterestRate, monthlyPayment, Math.min(totalMonths, 12));
            const result = {
                monthlyPayment: this.round(monthlyPayment),
                totalPayment: this.round(totalPayment),
                totalOverpaymentAmount: this.round(totalOverpaymentAmount),
                possibleTaxDeduction: this.round(possibleTaxDeduction),
                savingsDueMotherCapital: this.round(savingsDueMotherCapital),
                recommendedIncome: this.round(recommendedIncome),
                mortgagePaymentSchedule,
            };
            console.log('✅ Calculation completed successfully');
            return result;
        }
        catch (error) {
            console.error('❌ Error in calculateMortgage:', error);
            throw error;
        }
    }
    calculateMonthlyPayment(loanAmount, monthlyRate, totalMonths) {
        if (monthlyRate === 0) {
            return loanAmount / totalMonths;
        }
        try {
            const ratePower = Math.pow(1 + monthlyRate, totalMonths);
            const coefficient = (monthlyRate * ratePower) / (ratePower - 1);
            return loanAmount * coefficient;
        }
        catch (error) {
            console.error('❌ Error in calculateMonthlyPayment:', error);
            throw new Error(`Failed to calculate monthly payment: ${error.message}`);
        }
    }
    calculatePaymentSchedule(initialLoanAmount, monthlyRate, monthlyPayment, totalMonths) {
        console.log('📊 Generating payment schedule...');
        try {
            let balance = initialLoanAmount;
            const schedule = {};
            for (let month = 1; month <= totalMonths; month++) {
                const year = Math.ceil(month / 12);
                const monthInYear = ((month - 1) % 12) + 1;
                const yearKey = `Year ${year}`;
                const monthKey = `Month ${monthInYear}`;
                const interestPayment = balance * monthlyRate;
                const principalPayment = monthlyPayment - interestPayment;
                balance -= principalPayment;
                if (!schedule[yearKey]) {
                    schedule[yearKey] = {};
                }
                schedule[yearKey][monthKey] = {
                    totalPayment: this.round(monthlyPayment),
                    repaymentOfMortgageBody: this.round(principalPayment),
                    repaymentOfMortgageInterest: this.round(interestPayment),
                    mortgageBalance: this.round(Math.max(balance, 0)),
                };
            }
            console.log('✅ Payment schedule generated successfully');
            return schedule;
        }
        catch (error) {
            console.error('❌ Error in calculatePaymentSchedule:', error);
            throw new Error(`Failed to generate payment schedule: ${error.message}`);
        }
    }
    round(value) {
        return Math.round(value * 100) / 100;
    }
    async getUserCalculations(userId) {
        console.log('📚 Getting calculations for user:', userId);
        try {
            return {
                message: 'Database queries temporarily disabled',
                userId: userId
            };
        }
        catch (error) {
            console.error('❌ Error in getUserCalculations:', error);
            throw error;
        }
    }
};
exports.MortgageService = MortgageService;
exports.MortgageService = MortgageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE')),
    __metadata("design:paramtypes", [Object])
], MortgageService);
//# sourceMappingURL=mortgage.service.js.map