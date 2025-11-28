CREATE TABLE `mortgage_calculations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(255) NOT NULL,
	`mortgageProfileId` int NOT NULL,
	`monthlyPayment` decimal(15,2) NOT NULL,
	`totalPayment` decimal(15,2) NOT NULL,
	`totalOverpaymentAmount` decimal(15,2) NOT NULL,
	`possibleTaxDeduction` decimal(15,2) NOT NULL,
	`savingsDueMotherCapital` decimal(15,2) NOT NULL,
	`recommendedIncome` decimal(15,2) NOT NULL,
	`paymentSchedule` text NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mortgage_calculations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `mortgage_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` varchar(255) NOT NULL,
	`propertyPrice` decimal(15,2) NOT NULL,
	`propertyType` varchar(50) NOT NULL,
	`downPaymentAmount` decimal(15,2) NOT NULL,
	`matCapitalAmount` decimal(15,2),
	`matCapitalIncluded` boolean DEFAULT false,
	`loanTermYears` int NOT NULL,
	`interestRate` decimal(5,2) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `mortgage_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `AccountTokens`;--> statement-breakpoint
DROP TABLE `Accounts`;--> statement-breakpoint
DROP TABLE `RefreshTokens`;--> statement-breakpoint
ALTER TABLE `Users` MODIFY COLUMN `isActive` boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE `Users` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `Users` MODIFY COLUMN `updatedAt` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;