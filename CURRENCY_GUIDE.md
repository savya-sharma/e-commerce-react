# 💱 Currency Conversion Guide (Beginner Friendly)

## 🎯 What Does This Feature Do?

When you select a currency from the dropdown in the Navbar, **all product prices automatically convert** to that currency using **100% DYNAMIC real exchange rates from an API** (NO hardcoded rates!).

---

## 📚 How It Works (Step by Step)

### **Step 1: Currency Context (`Currency.jsx`)**

This file manages all currency-related data and shares it with all components.

```javascript
// When app loads, it fetches exchange rates from API
useEffect(() => {
    fetchExchangeRates();
}, []);
```

**What happens:**
- App calls `https://v6.exchangerate-api.com/v6/.../latest/INR`
- Gets **100% DYNAMIC** real exchange rates (e.g., 1 INR = 0.012 USD)
- Saves them in `exchangeRates` state
- **NO hardcoded rates** - everything comes from API!

---

### **Step 2: Navbar Dropdown**

User selects currency from dropdown:

```javascript
<select value={currency} onChange={handleCurrencyChange}>
    <option value="INR">INR (₹)</option>
    <option value="USD">USD ($)</option>
    <option value="EUR">EUR (€)</option>
</select>
```

**What happens:**
- When user selects "USD", `setCurrency('USD')` is called
- This updates the `currency` state
- All components using `useCurrency()` automatically re-render with new currency

---

### **Step 3: Product Pages Use Currency**

In `First.jsx` and `SingleProduct.jsx`:

```javascript
// Import the currency hook
import { useCurrency } from '../contexts/Currency'

// Use it in component
const { formatPrice } = useCurrency();

// Display price
<p>{formatPrice(obj.price)}</p>
```

**What happens:**
- `formatPrice(1000)` converts 1000 INR to selected currency
- If USD is selected: `1000 × 0.012 = $12.00`
- If EUR is selected: `1000 × 0.011 = €11.00`

---

## 🔧 Available Functions

### 1. `formatPrice(priceInINR)`
**Use this most of the time!**
- Converts price AND adds currency symbol
- Example: `formatPrice(1000)` → `"$ 12.00"`

### 2. `convertPrice(priceInINR)`
- Only converts, no symbol
- Example: `convertPrice(1000)` → `"12.00"`

### 3. `getCurrencySymbol()`
- Gets current currency symbol
- Example: `getCurrencySymbol()` → `"$"`

### 4. `currency`
- Current selected currency code
- Example: `"USD"`, `"EUR"`, `"INR"`

### 5. `setCurrency(code)`
- Change currency programmatically
- Example: `setCurrency('EUR')`

---

## 📝 How to Use in Your Component

```javascript
import { useCurrency } from '../contexts/Currency'

function MyComponent() {
    // Get currency functions
    const { formatPrice, currency } = useCurrency();
    
    const productPrice = 5000; // Price in INR
    
    return (
        <div>
            <p>Price: {formatPrice(productPrice)}</p>
            <p>Current Currency: {currency}</p>
        </div>
    );
}
```

---

## 🌐 API Details

**API Used:** ExchangeRate-API  
**Endpoint:** `https://v6.exchangerate-api.com/v6/e928549c3a8e6ff1d81c0d0b/latest/INR`

**Response Format:**
```json
{
    "conversion_rates": {
        "INR": 1,
        "USD": 0.012,
        "EUR": 0.011,
        "GBP": 0.0095,
        ...
    }
}
```

---

## ✅ Summary

1. **App loads** → Fetches exchange rates from API
2. **User selects currency** → Updates `currency` state
3. **Components re-render** → Prices automatically convert
4. **Use `formatPrice()`** → Easy price display with symbol

That's it! Simple and automatic! 🎉

