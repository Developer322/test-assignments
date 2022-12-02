import axios from 'axios';
import {
    TCurrency,
    IServerResponse,
    supportedCurrencies,
    ServerData,
    TConvertParams
} from '../types/types';

export const isSupportedCurrency = (str: string): str is TCurrency =>
    supportedCurrencies.includes(str);

export const getCurrencyRates = (
    currency: TCurrency
): Promise<IServerResponse> =>
    axios.get<ServerData>(
        `https://api.exchangerate.host/latest?base=${currency}`
    );

export const convertCurrencies = (
    convertParams: TConvertParams
): Promise<IServerResponse> =>
    axios.get<ServerData>(
        `https://api.exchangerate.host/latest?base=${convertParams.currencyFrom}&symbols=${convertParams.currencyTo}`
    );
