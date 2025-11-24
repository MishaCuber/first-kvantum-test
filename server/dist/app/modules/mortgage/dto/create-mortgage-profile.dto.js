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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMortgageProfileDto = void 0;
const class_validator_1 = require("class-validator");
const mortgage_profiles_1 = require("../schemas/mortgage-profiles");
class CreateMortgageProfileDto {
}
exports.CreateMortgageProfileDto = CreateMortgageProfileDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(100000),
    __metadata("design:type", Number)
], CreateMortgageProfileDto.prototype, "propertyPrice", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(mortgage_profiles_1.PropertyType),
    __metadata("design:type", String)
], CreateMortgageProfileDto.prototype, "propertyType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateMortgageProfileDto.prototype, "downPaymentAmount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Object)
], CreateMortgageProfileDto.prototype, "matCapitalAmount", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMortgageProfileDto.prototype, "matCapitalIncluded", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(30),
    __metadata("design:type", Number)
], CreateMortgageProfileDto.prototype, "loanTermYears", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(20),
    __metadata("design:type", Number)
], CreateMortgageProfileDto.prototype, "interestRate", void 0);
//# sourceMappingURL=create-mortgage-profile.dto.js.map