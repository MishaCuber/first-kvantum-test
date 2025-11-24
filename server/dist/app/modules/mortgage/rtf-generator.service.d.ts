import { MortgageCalculationResponseDto } from './dto/mortgage-calculation-response.dto';
import { CreateMortgageProfileDto } from './dto/create-mortgage-profile.dto';
export declare class RtfGeneratorService {
    generateMortgageRTF(calculation: MortgageCalculationResponseDto, profile: CreateMortgageProfileDto, userId: string): string;
    private formatCurrency;
    saveRTFToFile(rtfContent: string, filename: string): void;
}
