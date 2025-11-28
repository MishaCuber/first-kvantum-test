import { Injectable, Logger } from '@nestjs/common';
import { MortgageProfile, PropertyType } from '../entities/mortgage-profile.entity';
import { CreateMortgageProfileDto } from '../dto/create-mortgage-profile.dto';

@Injectable()
export class MortgageProfileService {
  private readonly logger = new Logger(MortgageProfileService.name);

  async create(profileData: {
    userId: string;
    propertyPrice: number;
    propertyType: PropertyType; // Меняем string на PropertyType
    downPaymentAmount: number;
    matCapitalAmount: number | null;
    matCapitalIncluded: boolean;
    loanTermYears: number;
    interestRate: number;
  }): Promise<MortgageProfile> {
    try {
      // Преобразуем undefined в null для matCapitalAmount
      const matCapitalAmount = profileData.matCapitalAmount ?? null;

      const mortgageProfile: MortgageProfile = {
        id: Date.now(),
        ...profileData,
        propertyType: profileData.propertyType as PropertyType, // Явно указываем тип
        matCapitalAmount,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.logger.log(`Mortgage profile created with ID: ${mortgageProfile.id}`);
      return mortgageProfile;
    } catch (error) {
      this.logger.error(`Error creating mortgage profile: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findById(id: number): Promise<MortgageProfile | null> {
    return null;
  }
}