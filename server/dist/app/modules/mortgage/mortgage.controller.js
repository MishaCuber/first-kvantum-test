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
exports.MortgageController = void 0;
const common_1 = require("@nestjs/common");
const mortgage_service_1 = require("./mortgage.service");
const create_mortgage_profile_dto_1 = require("./dto/create-mortgage-profile.dto");
const mortgage_profiles_1 = require("./schemas/mortgage-profiles");
const rtf_generator_service_1 = require("./rtf-generator.service");
let MortgageController = class MortgageController {
    constructor(mortgageService, rtfGenerator) {
        this.mortgageService = mortgageService;
        this.rtfGenerator = rtfGenerator;
    }
    async testDatabase() {
        try {
            console.log('🧪 Starting database tests...');
            const simpleTest = await this.mortgageService.testSimpleQuery();
            console.log('✅ Simple query test passed');
            const tableTest = await this.mortgageService.testTableExists();
            console.log('✅ Table check test passed');
            return {
                status: 'success',
                message: 'Database tests passed (Drizzle disabled)',
                tests: {
                    simpleQuery: simpleTest,
                    tableExists: tableTest
                }
            };
        }
        catch (error) {
            console.error('❌ Database test failed:', error);
            return {
                status: 'error',
                message: 'Database test failed',
                error: error.message
            };
        }
    }
    async createMortgageProfile(createDto) {
        console.log('📨 Received POST request:', createDto);
        try {
            const userId = 'demo-user-id';
            return await this.mortgageService.createMortgageCalculation(createDto, userId);
        }
        catch (error) {
            console.error('❌ Error in controller:', error);
            throw error;
        }
    }
    async testSimpleCalculation() {
        try {
            const testData = {
                propertyPrice: 5000000,
                propertyType: mortgage_profiles_1.PropertyType.APARTMENT_NEW,
                downPaymentAmount: 1000000,
                matCapitalAmount: 450000,
                matCapitalIncluded: true,
                loanTermYears: 20,
                interestRate: 7.5
            };
            const result = await this.mortgageService.createMortgageCalculation(testData, 'test-user');
            return {
                status: 'success',
                message: 'Simple calculation test passed',
                data: result
            };
        }
        catch (error) {
            return {
                status: 'error',
                message: 'Simple calculation test failed',
                error: error.message
            };
        }
    }
    async getUserCalculations(userId) {
        try {
            return await this.mortgageService.getUserCalculations(userId);
        }
        catch (error) {
            console.error('❌ Error getting user calculations:', error);
            throw error;
        }
    }
    async testSchedule() {
        try {
            const testData = {
                propertyPrice: 5000000,
                propertyType: mortgage_profiles_1.PropertyType.APARTMENT_NEW,
                downPaymentAmount: 1000000,
                matCapitalAmount: 450000,
                matCapitalIncluded: true,
                loanTermYears: 20,
                interestRate: 7.5
            };
            const result = await this.mortgageService.createMortgageCalculation(testData, 'test-user');
            return {
                status: 'success',
                schedule: result.mortgagePaymentSchedule
            };
        }
        catch (error) {
            return {
                status: 'error',
                error: error.message
            };
        }
    }
    async generateRTF(calculationId) {
        try {
            const testData = {
                propertyPrice: 5000000,
                propertyType: mortgage_profiles_1.PropertyType.APARTMENT_NEW,
                downPaymentAmount: 1000000,
                matCapitalAmount: 450000,
                matCapitalIncluded: true,
                loanTermYears: 20,
                interestRate: 7.5
            };
            const calculation = await this.mortgageService.createMortgageCalculation(testData, 'test-user');
            const rtfContent = this.rtfGenerator.generateMortgageRTF(calculation, testData, 'test-user');
            this.rtfGenerator.saveRTFToFile(rtfContent, `mortgage_calculation_${calculationId}.rtf`);
            return {
                status: 'success',
                message: 'RTF документ сгенерирован',
                filename: `mortgage_calculation_${calculationId}.rtf`,
                downloadUrl: `/api/mortgage-profiles/download-rtf/${calculationId}`
            };
        }
        catch (error) {
            return {
                status: 'error',
                error: error.message
            };
        }
    }
};
exports.MortgageController = MortgageController;
__decorate([
    (0, common_1.Get)('test-db'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MortgageController.prototype, "testDatabase", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_mortgage_profile_dto_1.CreateMortgageProfileDto]),
    __metadata("design:returntype", Promise)
], MortgageController.prototype, "createMortgageProfile", null);
__decorate([
    (0, common_1.Get)('test-simple'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MortgageController.prototype, "testSimpleCalculation", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MortgageController.prototype, "getUserCalculations", null);
__decorate([
    (0, common_1.Get)('test-schedule'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MortgageController.prototype, "testSchedule", null);
__decorate([
    (0, common_1.Get)('generate-rtf/:calculationId'),
    __param(0, (0, common_1.Param)('calculationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MortgageController.prototype, "generateRTF", null);
exports.MortgageController = MortgageController = __decorate([
    (0, common_1.Controller)('mortgage-profiles'),
    __metadata("design:paramtypes", [mortgage_service_1.MortgageService, rtf_generator_service_1.RtfGeneratorService])
], MortgageController);
//# sourceMappingURL=mortgage.controller.js.map