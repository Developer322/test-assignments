import { useQuery } from 'react-query';
import { getCurrencyRates, isSupportedCurrency } from '../utils/fetchers';
import { ServerData, TCurrencyRate } from '../types/types';
import Loader from './loader';
import { State } from '../utils/store';

const CurrenciesSheetPage = ({ state }: { state: State }) => {
    const { isLoading, data } = useQuery<ServerData, Error>({
        queryKey: ['currencyRates', state.currentCurrency],
        queryFn: async () =>
            (await getCurrencyRates(state.currentCurrency)).data,
        refetchInterval: 5000
    });

    if (!isLoading && data !== undefined && 'rates' in data) {
        return (
            <div className="contentContainer">
                <CurrencyTable rates={data.rates} state={state} />
            </div>
        );
    } else {
        return <Loader />;
    }
};

interface CurrencyTableProps {
    rates: TCurrencyRate;
    state: State;
}

const CurrencyTable = ({ rates, state }: CurrencyTableProps) => (
    <table className="sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-white">
            <tr className="bg-teal-400 sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                <th className="px-3 py-1 text-left">Currency</th>
                <th className="px-3 py-1 text-left">Rate</th>
            </tr>
        </thead>
        <tbody className="bg-blue-50 lg:text-black">
            {Object.entries(rates)
                .filter(
                    (currency) =>
                        isSupportedCurrency(currency[0]) &&
                        currency[0] !== state.currentCurrency
                )
                .map((entry) => {
                    const rate = +entry[1];
                    return (
                        <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                            <th className="px-3 py-1 border-grey-light border hover:bg-blue-100 cursor-default">
                                {entry[0]}
                            </th>
                            <td className="px-3 py-1 border-grey-light border hover:bg-blue-100 cursor-default">
                                {rate.toFixed(2) !== '0.00'
                                    ? rate.toFixed(2)
                                    : rate}
                            </td>
                        </tr>
                    );
                })}
        </tbody>
    </table>
);

export default CurrenciesSheetPage;
