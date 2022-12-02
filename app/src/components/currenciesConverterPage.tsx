import { paramsExtractor } from '../utils/stringCounter';
import { useQuery } from 'react-query';
import { convertCurrencies } from '../utils/fetchers';
import { useState } from 'react';
import { BsInfoCircle } from 'react-icons/bs/index.js';
import ReactTooltip from 'react-tooltip';
import { currencies, TConvertParams, ServerData } from '../types/types';

const ConverterPage = () => {
    const [convertParams, setConvertParams] = useState<TConvertParams>({
        currencyFrom: 'USD',
        currencyTo: 'RUB',
        amount: -1
    });

    const [message, setMessage] = useState('Enter the string');

    const { data, isLoading } = useQuery<ServerData, Error>({
        queryKey: [
            'convertCurrency',
            convertParams.currencyFrom,
            convertParams.currencyTo
        ],
        queryFn: async () => {
            if (convertParams !== undefined) {
                return (await convertCurrencies(convertParams)).data;
            } else {
                return { data };
            }
        },
        enabled: convertParams.amount >= 0
    });

    let rate =
        data !== undefined && 'rates' in data
            ? +data.rates[convertParams.currencyTo]
            : 0;

    return (
        <div className="contentContainer">
            <div className="flex flex-col items-center max-w-screen-md">
                <div>
                    {!isLoading &&
                    rate > 0 &&
                    convertParams.amount >= 0 &&
                    message === ''
                        ? `${convertParams.amount?.toFixed(2)} ${
                              convertParams.currencyFrom
                          } is ${(convertParams.amount * rate).toFixed(2)} ${
                              convertParams.currencyTo
                          }`
                        : message}
                </div>
                <div className="flex items-center mt-8">
                    <input
                        className="w-60 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="15 usd in rub"
                        onChange={(e) => {
                            try {
                                const params = paramsExtractor(e.target.value);
                                if (message !== '') setMessage('');
                                setConvertParams(params);
                            } catch (e) {
                                if (message !== 'Invalid string')
                                    setMessage('Invalid string');
                            }
                        }}
                    />
                    <BsInfoCircle
                        className="ml-4 text-lg"
                        data-tip
                        data-for="supportedCurriencesTip"
                    />
                    <ReactTooltip
                        id="supportedCurriencesTip"
                        place="top"
                        effect="solid"
                        className="w-2/3"
                    >
                        Supported currencies: {currencies.join(', ')}
                    </ReactTooltip>
                </div>
            </div>
        </div>
    );
};
export default ConverterPage;
