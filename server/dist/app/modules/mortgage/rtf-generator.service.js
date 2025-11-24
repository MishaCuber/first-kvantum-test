"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtfGeneratorService = void 0;
const common_1 = require("@nestjs/common");
let RtfGeneratorService = class RtfGeneratorService {
    generateMortgageRTF(calculation, profile, userId) {
        const { mortgagePaymentSchedule, ...mainData } = calculation;
        let rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}
\\f0\\fs24
{\\b\\fs36 ИПОТЕЧНЫЙ РАСЧЕТ}
\\line\\line
{\\b Основные параметры:}
\\line
Стоимость недвижимости: ${this.formatCurrency(profile.propertyPrice)}
\\line
Первоначальный взнос: ${this.formatCurrency(profile.downPaymentAmount)}
\\line
Материнский капитал: ${this.formatCurrency(profile.matCapitalAmount || 0)}
\\line
Срок кредита: ${profile.loanTermYears} лет
\\line
Процентная ставка: ${profile.interestRate}%
\\line\\line
{\\b Результаты расчета:}
\\line
Ежемесячный платеж: {\\b ${this.formatCurrency(mainData.monthlyPayment)}}
\\line
Общая сумма выплат: ${this.formatCurrency(mainData.totalPayment)}
\\line
Переплата по кредиту: ${this.formatCurrency(mainData.totalOverpaymentAmount)}
\\line
Налоговый вычет: ${this.formatCurrency(mainData.possibleTaxDeduction)}
\\line
Экономия от мат.капитала: ${this.formatCurrency(mainData.savingsDueMotherCapital)}
\\line
Рекомендуемый доход: {\\b ${this.formatCurrency(mainData.recommendedIncome)}}
\\line\\line
{\\b График платежей (первые 12 месяцев):}
\\line
`;
        const firstYear = mortgagePaymentSchedule['Year 1'];
        if (firstYear) {
            rtfContent += `Месяц | Тело кредита | Проценты | Итого | Остаток долга\\\\
`;
            for (const [month, payment] of Object.entries(firstYear)) {
                rtfContent += `${month} | ${this.formatCurrency(payment.repaymentOfMortgageBody)} | ${this.formatCurrency(payment.repaymentOfMortgageInterest)} | ${this.formatCurrency(payment.totalPayment)} | ${this.formatCurrency(payment.mortgageBalance)}\\\\
`;
            }
        }
        rtfContent += `
\\line
Дата формирования: ${new Date().toLocaleDateString('ru-RU')}
\\line
Пользователь: ${userId}
}`;
        return rtfContent;
    }
    formatCurrency(amount) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 2
        }).format(amount);
    }
    saveRTFToFile(rtfContent, filename) {
        const fs = require('fs');
        fs.writeFileSync(filename, rtfContent);
        console.log(`✅ RTF документ сохранен: ${filename}`);
    }
};
exports.RtfGeneratorService = RtfGeneratorService;
exports.RtfGeneratorService = RtfGeneratorService = __decorate([
    (0, common_1.Injectable)()
], RtfGeneratorService);
//# sourceMappingURL=rtf-generator.service.js.map