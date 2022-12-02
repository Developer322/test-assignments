import { useReducer } from 'react';
import { TCurrency } from '../types/types';

export type State = {
    currentCurrency: TCurrency;
};

enum ActionType {
    SET_CURRENT_CURRENCY = 'SET_CURRENT_CURRENCY'
}

type Action = {
    type: ActionType;
    payload: TCurrency;
};

const initailState: State = {
    currentCurrency: 'USD'
};

const useStore = () => {
    const setCurrentCurrencyAction = (currency: TCurrency): Action => ({
        type: ActionType.SET_CURRENT_CURRENCY,
        payload: currency
    });

    const setCurrentCurrency = (currency: TCurrency): void =>
        dispatch(setCurrentCurrencyAction(currency));

    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case ActionType.SET_CURRENT_CURRENCY:
                return { ...state, currentCurrency: action?.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initailState);

    return { state, setCurrentCurrency };
};

export { useStore };
