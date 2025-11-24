import { MortgageService } from './mortgage.service';
import { CreateMortgageProfileDto } from './dto/create-mortgage-profile.dto';
import { MortgageCalculationResponseDto } from './dto/mortgage-calculation-response.dto';
import { RtfGeneratorService } from './rtf-generator.service';
export declare class MortgageController {
    private readonly mortgageService;
    private readonly rtfGenerator;
    constructor(mortgageService: MortgageService, rtfGenerator: RtfGeneratorService);
    testDatabase(): Promise<{
        status: string;
        message: string;
        tests: {
            simpleQuery: import("drizzle-orm/mysql2").MySqlRawQueryResult;
            tableExists: import("drizzle-orm/mysql2").MySqlRawQueryResult;
        };
        error?: undefined;
    } | {
        status: string;
        message: string;
        error: any;
        tests?: undefined;
    }>;
    createMortgageProfile(createDto: CreateMortgageProfileDto): Promise<MortgageCalculationResponseDto>;
    testSimpleCalculation(): Promise<{
        status: string;
        message: string;
        data: MortgageCalculationResponseDto;
        error?: undefined;
    } | {
        status: string;
        message: string;
        error: any;
        data?: undefined;
    }>;
    getUserCalculations(userId: string): Promise<{
        message: string;
        userId: string;
    }>;
    testSchedule(): Promise<{
        status: string;
        schedule: import("./dto/mortgage-calculation-response.dto").MortgagePaymentSchedule;
        error?: undefined;
    } | {
        status: string;
        error: any;
        schedule?: undefined;
    }>;
    generateRTF(calculationId: string): Promise<{
        status: string;
        message: string;
        filename: string;
        downloadUrl: string;
        error?: undefined;
    } | {
        status: string;
        error: any;
        message?: undefined;
        filename?: undefined;
        downloadUrl?: undefined;
    }>;
}
