import { TConvertParams } from '../types/types';
import { isSupportedCurrency } from '../utils/fetchers';

const paramsExtractor = (str: string): TConvertParams => {
    const upperStr = str.toUpperCase().trim();
    const words: string[] = upperStr.split(/\s+/gi);
    const numbers: number[] = words
        .filter((word) => !Object.is(+word, NaN))
        .map((num) => +num);
    const currencies = words.filter((word) => isSupportedCurrency(word));
    if (numbers.length === 0 || currencies.length !== 2) {
        throw new Error('Invalid string');
    } else {
        if (
            isSupportedCurrency(currencies[0]) &&
            isSupportedCurrency(currencies[1])
        ) {
            return {
                currencyFrom: currencies[0],
                currencyTo: currencies[1],
                amount: numbers[numbers.length - 1]
            };
        } else {
            throw new Error('Invalid string');
        }
    }
};

export { paramsExtractor };
