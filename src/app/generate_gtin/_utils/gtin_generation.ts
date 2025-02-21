export enum Country {
    Brazil = "BR",
    UnitedStates = "US",
}

/**
 * Country prefix ranges for GTIN-13 generation
 */
interface CountryPrefix {
    min: number;
    max: number;
}

type CountryPrefixMap = {
    [key in Country]: CountryPrefix;
};

/**
 * Generates a valid GTIN-13 code based on the country prefix
 * GTIN-13 is a 13-digit number used for product identification
 * @param country - The country for which to generate the GTIN-13
 * @returns A valid GTIN-13 code as a string
 * @throws Error if the country is not supported
 */
export function generateGtin13(country: Country): string {
    const GTIN_LENGTH = 13;
    const PREFIX_LENGTH = 3;

    const countryPrefixes: CountryPrefixMap = {
        [Country.Brazil]: { min: 789, max: 790 },
        [Country.UnitedStates]: { min: 0, max: 19 }
    };

    const prefix = countryPrefixes[country];
    if (!prefix) {
        throw new Error(`Country ${country} not supported`);
    }

    const prefixValue = getRandomIntInRange(prefix.min, prefix.max);
    const digits = padNumberToLength(prefixValue, PREFIX_LENGTH);

    const remainingLength = GTIN_LENGTH - PREFIX_LENGTH - 1; // -1 for check digit
    for (let i = 0; i < remainingLength; i++) {
        digits.push(getRandomIntInRange(0, 9));
    }

    const checkDigit = calculateCheckDigit(digits);
    digits.push(checkDigit);

    return digits.join('');
}

/**
 * Generates a random integer within the specified range (inclusive)
 */
function getRandomIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Pads a number with leading zeros to achieve the specified length
 */
function padNumberToLength(num: number, length: number): number[] {
    const digits = num.toString().padStart(length, '0').split('').map(Number);
    return digits;
}

/**
 * Calculates the GTIN-13 check digit using the standard algorithm
 * @param digits - Array of the first 12 digits
 * @returns The check digit (0-9)
 */
function calculateCheckDigit(digits: number[]): number {
    const weights = [1, 3];
    const sum = digits.reduce((acc, digit, index) => {
        return acc + digit * weights[index % 2];
    }, 0);

    return (10 - (sum % 10)) % 10;
}