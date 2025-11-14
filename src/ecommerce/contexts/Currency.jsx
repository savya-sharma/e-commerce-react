import React, { createContext, useContext, useState, useEffect } from 'react'
import { exchnageRateAPI } from '../config/axiosConfig'

const currencyContext = createContext();

const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('INR');

    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        fetchExchangeRates();
    }, []);


    async function fetchExchangeRates() {
        try {
            // Call API to get latest rates (base currency is INR)
            const response = await exchnageRateAPI.get('/INR');
            console.log(response.data);

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
        const convertedPrice = priceInINR * exchangeRates[currency];
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

    // Step 8: Function to format price with symbol (e.g., "₹ 100" or "$ 1.20")
    function formatPrice(priceInINR) {
        const converted = convertPrice(priceInINR);
        return `${getCurrencySymbol()} ${converted}`;
    }

    // Step 9: Package all data and functions to share with other components
    const value = {
        currency,           // Current selected currency (INR, USD, EUR, etc.)
        setCurrency,        // Function to change currency
        convertPrice,       // Function to convert price
        getCurrencySymbol,  // Function to get symbol
        formatPrice,        // Function to format price with symbol
        exchangeRates       // All exchange rates from API
    };

    // Step 10: Provide the data to all child components
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
