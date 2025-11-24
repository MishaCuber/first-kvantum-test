import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { Database } from './schema';
import { DATABASE_CONSTANTS } from './constants';
import { databaseSchema } from './schema';

@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: 'DATABASE',
            useFactory: async (configService: ConfigService): Promise<Database> => {
                console.log('🔌 Connecting to database...', {
                    host: configService.get('HOST'),
                    port: configService.get('PORT'),
                    user: configService.get('USERNAME'),
                    database: configService.get('DATABASE')
                });

                try {
                    const connection = mysql.createPool({
                        host: configService.get('HOST'),
                        port: parseInt(configService.get('PORT') || '3306'),
                        user: configService.get('USERNAME'),
                        password: configService.get('PASSWORD') || undefined,
                        database: configService.get('DATABASE'),
                        timezone: DATABASE_CONSTANTS.DEFAULT_TIMEZONE,
                        dateStrings: true,
                    });

                    const db = drizzle(connection, {
                        schema: databaseSchema,
                        mode: 'default'
                    }) as Database;

                    console.log('✅ Database connected successfully');
                    return db;
                } catch (error) {
                    console.error('❌ Database connection failed:', error);
                    throw error;
                }
            },
            inject: [ConfigService],
        },
    ],
    exports: ['DATABASE'],
})
export class DatabaseModule { }