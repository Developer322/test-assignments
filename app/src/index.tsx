import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Error from './components/Error';
import { QueryClient, QueryClientProvider } from 'react-query';
import Loader from './components/loader';
import UpperMenu from './components/upperMenu';
import { useStore } from './utils/store';
import Footer from './components/footer';

const Converter = React.lazy(
    () => import('./components/currenciesConverterPage')
);
const CurrenciesSheet = React.lazy(() => import('./components/currenciesPage'));
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const RootApp = () => {
    const { state, setCurrentCurrency } = useStore();
    return (
        <React.StrictMode>
            <BrowserRouter>
                <React.Suspense fallback={<Loader />}>
                    <QueryClientProvider client={queryClient}>
                        <main className="w-full h-screen flex flex-col">
                            <UpperMenu
                                setCurrentCurrency={setCurrentCurrency}
                            />
                            <Routes>
                                <Route
                                    path="/converter"
                                    element={<Converter />}
                                />
                                <Route
                                    path="/sheet"
                                    element={<CurrenciesSheet state={state} />}
                                />
                                <Route
                                    path="/"
                                    element={<Navigate to="/sheet" />}
                                />
                                <Route path="*" element={<Error />} />
                            </Routes>
                            <Footer />
                        </main>
                    </QueryClientProvider>
                </React.Suspense>
            </BrowserRouter>
        </React.StrictMode>
    );
};

root.render(<RootApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
