import { Module } from '@nestjs/common';
import { MortgageController } from './mortgage.controller';
import { MortgageService } from './mortgage.service';
import { RtfGeneratorService } from './rtf-generator.service';

@Module({
  controllers: [MortgageController],
  providers: [MortgageService, RtfGeneratorService],
  exports: [MortgageService],
})
export class MortgageModule {}