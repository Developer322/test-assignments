import { Link } from 'react-router-dom';
import Select, { ActionMeta } from 'react-select';
import { isSupportedCurrency } from '../utils/fetchers';
import { TCurrency, supportedCurrencies } from '../types/types';
import { useCallback } from 'react';
import { SelectOptionType } from '../types/types';

const options: SelectOptionType[] = supportedCurrencies.map((currency) => ({
    value: currency,
    label: currency
}));

const UpperMenu = ({
    setCurrentCurrency
}: {
    setCurrentCurrency: (currency: TCurrency) => void;
}) => {
    const onChange = useCallback(
        (
            option: SelectOptionType | null,
            actionMeta: ActionMeta<SelectOptionType>
        ) => {
            if (
                option !== null &&
                'value' in option &&
                isSupportedCurrency(option.value)
            ) {
                setCurrentCurrency(option.value);
            }
        },
        [setCurrentCurrency]
    );

    return (
        <nav className="flex flex-row justify-center items-center pt-4">
            <Link
                className="mx-4 text-gray-400 hover:text-gray-500 hover:underline decoration-gray-500 underline-offset-4"
                to="/sheet"
            >
                Sheet
            </Link>
            <Link
                className="mx-4 text-gray-400 hover:text-gray-500 hover:underline decoration-gray-500 underline-offset-4"
                to="/converter"
            >
                Converter
            </Link>
            <Select
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: 'none',
                        boxShadow: 'none'
                    }),
                    indicatorSeparator: (baseStyles, state) => ({
                        display: 'none'
                    })
                }}
                defaultValue={options[0]}
                isSearchable={false}
                onChange={onChange}
                options={options}
            />
        </nav>
    );
};

export default UpperMenu;
