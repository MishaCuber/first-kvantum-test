import { Module } from '@nestjs/common';
import { MortgageController } from './controllers/mortgage.controller';
import { MortgageProfileService } from './services/mortgage-profile.service';
import { MortgageCalculationService } from './services/mortgage-calculation.service';
import { MortgagePaymentCalculatorService } from './services/mortgage-payment-calculator.service';

@Module({
  controllers: [MortgageController],
  providers: [
    MortgageProfileService,
    MortgageCalculationService,
    MortgagePaymentCalculatorService,
  ],
  exports: [
    MortgageProfileService,
    MortgageCalculationService,
  ],
})
export class MortgageModule {}