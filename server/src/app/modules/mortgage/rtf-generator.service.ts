import { Injectable } from '@nestjs/common';
import { MortgageCalculationResponseDto } from './dto/mortgage-calculation-response.dto';
import { CreateMortgageProfileDto } from './dto/create-mortgage-profile.dto';

@Injectable()
export class RtfGeneratorService {
  generateMortgageRTF(
    calculation: MortgageCalculationResponseDto,
    profile: CreateMortgageProfileDto,
    userId: string
  ): string {
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

    // Добавляем график платежей (первые 12 месяцев)
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

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 2
    }).format(amount);
  }

  saveRTFToFile(rtfContent: string, filename: string): void {
    const fs = require('fs');
    fs.writeFileSync(filename, rtfContent);
    console.log(`✅ RTF документ сохранен: ${filename}`);
  }
}