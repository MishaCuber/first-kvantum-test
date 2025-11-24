import { Database } from '../../../database/schema';
import { CreateMortgageProfileDto } from './dto/create-mortgage-profile.dto';
import { MortgageCalculationResponseDto } from './dto/mortgage-calculation-response.dto';
export declare class MortgageService {
    private readonly db;
    constructor(db: Database);
    testSimpleQuery(): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    testTableExists(): Promise<import("drizzle-orm/mysql2").MySqlRawQueryResult>;
    createMortgageCalculation(createDto: CreateMortgageProfileDto, userId: string): Promise<MortgageCalculationResponseDto>;
    private calculateMortgage;
    private calculateMonthlyPayment;
    private calculatePaymentSchedule;
    private round;
    getUserCalculations(userId: string): Promise<{
        message: string;
        userId: string;
    }>;
}
