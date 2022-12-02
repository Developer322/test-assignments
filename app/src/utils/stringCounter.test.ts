import { paramsExtractor } from './stringCounter';
import { describe, expect, test } from '@jest/globals';

describe('my beverage', () => {
    test('valid string works', () => {
        expect(paramsExtractor('10 usd rub')).toEqual({
            currencyFrom: 'USD',
            currencyTo: 'RUB',
            amount: 10
        });
    });

    test('valid string with another words works', () => {
        expect(paramsExtractor('2 btc to rub')).toEqual({
            currencyFrom: 'BTC',
            currencyTo: 'RUB',
            amount: 2
        });
    });

    test('floats works', () => {
        expect(paramsExtractor('2.5 aed in usd')).toEqual({
            currencyFrom: 'AED',
            currencyTo: 'USD',
            amount: 2.5
        });
    });

    test("invalid string doesn't work", () => {
        expect(() => paramsExtractor('5 lol usd')).toThrow(Error);
    });
});
