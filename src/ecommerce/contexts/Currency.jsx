import React, { createContext, useContext, useState, useEffect } from 'react'
import { exchnageRateAPI } from '../config/axiosConfig'

const currencyContext = createContext();

const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(() => {
        return localStorage.getItem('currency') || 'INR'
    }
    );

    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        fetchExchangeRates();
    }, []);

    useEffect(() => {
        if (currency) {
            localStorage.setItem('currency', currency);
        }
    }, []);


    async function fetchExchangeRates() {
        try {
            const response = await exchnageRateAPI.get('/INR');
            console.log(response.data);
            localStorage.setItem('exchangeRates', JSON.stringify(response.data.conversion_rates));

            if (response.data && response.data.conversion_rates) {
                setExchangeRates(response.data.conversion_rates);
            }
        } catch (error) {
            console.error(error);
            setExchangeRates({});  //if api files, set exchange rates to empty object
        }
    }

    function convertPrice(priceInINR) {
        // Check if exchange rate exists for selected currency
        if (!exchangeRates[currency]) {
            return priceInINR;
        }
        console.log(!exchangeRates[currency])
        const convertedPrice = priceInINR * exchangeRates[currency];   //price is the original price of the product, and exchangeRates[currency] comes from the API response
        console.log(convertedPrice)
        return convertedPrice.toFixed(2);
    }

    function getCurrencySymbol() {
        const symbols = {
            INR: '₹',
            USD: '$',
            EUR: '€',
        };
        return symbols[currency];
    }

    function formatPrice(priceInINR) {
        const converted = convertPrice(priceInINR);
        return `${getCurrencySymbol()} ${converted}`;
    }

    const value = {
        currency,
        setCurrency,
        convertPrice,
        getCurrencySymbol,
        formatPrice,        // Function to format price with symbol
        exchangeRates       // All exchange rates from API
    };

    return (
        <currencyContext.Provider value={value}>
            {children}
        </currencyContext.Provider>
    )
}

// Step 11: Custom hook to use currency in any component
export function useCurrency() {
    const context = useContext(currencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
}

export default CurrencyProvider
