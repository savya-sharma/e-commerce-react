# 💰 Currency Feature - Simple Explanation for Beginners

## 🎯 What Does This Feature Do?
When you select a currency (INR, USD, EUR) from the dropdown in the Navbar, all product prices across the website automatically change to show prices in that currency.

---

## 📁 Files Involved

### 1. **Currency.jsx** (The Brain 🧠)
**Location:** `src/ecommerce/contexts/Currency.jsx`

**What it does:**
- Stores which currency is selected (INR, USD, or EUR)
- Has conversion rates (how much 1 INR equals in other currencies)
- Provides functions to convert prices and get currency symbols

**Key Parts:**
```javascript
// Which currency is selected
const [currency, setCurrency] = useState('INR');

// Conversion rates (1 INR = ?)
const exchangeRates = {
    INR: 1,        // 1 INR = 1 INR
    USD: 0.012,    // 1 INR = 0.012 USD
    EUR: 0.011,    // 1 INR = 0.011 EUR
};

// Convert price from INR to selected currency
function convertPrice(priceInINR) {
    const convertedPrice = priceInINR * exchangeRates[currency];
    return convertedPrice.toFixed(2);
}

// Get currency symbol (₹, $, €)
function getCurrencySymbol() {
    const symbols = { INR: '₹', USD: '$', EUR: '€' };
    return symbols[currency];
}

// Format price with symbol (e.g., "₹ 100" or "$ 1.20")
function formatPrice(priceInINR) {
    const converted = convertPrice(priceInINR);
    return `${getCurrencySymbol()} ${converted}`;
}
```

---

### 2. **Navbar.jsx** (The Dropdown 📋)
**Location:** `src/ecommerce/components/Navbar.jsx`

**What it does:**
- Shows a dropdown with currency options
- When user selects a currency, it updates the global currency state

**Key Parts:**
```javascript
// Get current currency and function to change it
const { currency, setCurrency } = useCurrency();

// When user selects a currency
function handleCurrencyChange(e) {
    setCurrency(e.target.value); // Update currency
}

// Dropdown
<select value={currency} onChange={handleCurrencyChange}>
    <option value="INR">INR (₹)</option>
    <option value="USD">USD ($)</option>
    <option value="EUR">EUR (€)</option>
</select>
```

---

### 3. **First.jsx** (Product List Page 🛍️)
**Location:** `src/ecommerce/pages/First.jsx`

**What it does:**
- Shows all products
- Uses `formatPrice()` to display prices in selected currency

**Key Parts:**
```javascript
// Get formatPrice function
const { formatPrice } = useCurrency();

// Show price (automatically converts to selected currency)
<p>{formatPrice(obj.price)}</p>
```

---

### 4. **SingleProduct.jsx** (Product Detail Page 📦)
**Location:** `src/ecommerce/pages/SingleProduct.jsx`

**What it does:**
- Shows single product details
- Uses `formatPrice()` to display price in selected currency

**Key Parts:**
```javascript
// Get formatPrice function
const { formatPrice } = useCurrency();

// Show price
<span>{formatPrice(singleProduct.price)}</span>
```

---

### 5. **Cart.jsx** (Shopping Cart 🛒)
**Location:** `src/ecommerce/pages/Cart.jsx`

**What it does:**
- Shows cart items and total
- Uses `convertPrice()` and `getCurrencySymbol()` to show prices in selected currency

**Key Parts:**
```javascript
// Get conversion functions
const { convertPrice, getCurrencySymbol } = useCurrency();

// Show item price
<span>
    {getCurrencySymbol()} {convertPrice(obj.price * quantity)}
</span>

// Show total
<span>
    {getCurrencySymbol()} {convertPrice(totalPrice())}
</span>
```

---

## 🔄 How It Works (Step by Step)

1. **User opens website** → Default currency is INR (₹)
2. **User clicks dropdown in Navbar** → Sees INR, USD, EUR options
3. **User selects USD** → `setCurrency('USD')` is called
4. **Currency state updates** → All components using `useCurrency()` get notified
5. **Prices update automatically** → All pages show prices in USD ($)

---

## 🧮 Example Calculation

**Product price in database:** ₹ 1000

**User selects USD:**
- Conversion rate: 1 INR = 0.012 USD
- Calculation: 1000 × 0.012 = 12.00
- Display: **$ 12.00**

**User selects EUR:**
- Conversion rate: 1 INR = 0.011 EUR
- Calculation: 1000 × 0.011 = 11.00
- Display: **€ 11.00**

---

## 🎓 Key React Concepts Used

1. **Context API** - Share currency data across all components
2. **useState** - Store selected currency
3. **Custom Hook** - `useCurrency()` to access currency functions
4. **Props** - Pass data between components

---

## ✅ Summary

- **Currency.jsx** = Stores currency and conversion logic
- **Navbar.jsx** = Dropdown to select currency
- **Product pages** = Use `formatPrice()` to show converted prices
- **Cart page** = Use `convertPrice()` and `getCurrencySymbol()` for prices

That's it! Simple and clean! 🎉

