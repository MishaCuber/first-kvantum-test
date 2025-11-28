-- Создание таблицы mortgage_profiles
CREATE TABLE IF NOT EXISTS `mortgage_profiles` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` VARCHAR(255) NOT NULL,
    `propertyPrice` DECIMAL(15,2) NOT NULL,
    `propertyType` VARCHAR(50) NOT NULL,
    `downPaymentAmount` DECIMAL(15,2) NOT NULL,
    `matCapitalAmount` DECIMAL(15,2) NULL,
    `matCapitalIncluded` BOOLEAN DEFAULT FALSE,
    `loanTermYears` INT NOT NULL,
    `interestRate` DECIMAL(5,2) NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Создание таблицы mortgage_calculations
CREATE TABLE IF NOT EXISTS `mortgage_calculations` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` VARCHAR(255) NOT NULL,
    `mortgageProfileId` INT NOT NULL,
    `monthlyPayment` DECIMAL(15,2) NOT NULL,
    `totalPayment` DECIMAL(15,2) NOT NULL,
    `totalOverpaymentAmount` DECIMAL(15,2) NOT NULL,
    `possibleTaxDeduction` DECIMAL(15,2) NOT NULL,
    `savingsDueMotherCapital` DECIMAL(15,2) NOT NULL,
    `recommendedIncome` DECIMAL(15,2) NOT NULL,
    `paymentSchedule` TEXT NOT NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`mortgageProfileId`) REFERENCES `mortgage_profiles`(`id`) ON DELETE CASCADE
);