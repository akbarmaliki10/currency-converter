import { useState, useMemo, useCallback } from 'react'
import './App.css'
import CurrencySelect from './CurrencySelect'
import useCurrencyRates from './hooks/useCurrencyRates';

const DEFAULT_MAPPING = {
  "USD": 1,
  "EUR": 0.92,
  "GBP": 0.78,
  "JPY": 156.7,
  "IDR": 17800
};


export function CurrencyConverter() {
  const [fromCurr, setFromCurr] = useState('USD')
  const [toCurr, setToCurr] = useState('IDR')
  const [inputValue, setInputValue] = useState(1)

  const { data: rates, error, isLoading } = useCurrencyRates()

  const CURRENCY_MAPPING = rates || DEFAULT_MAPPING
  const ARRAY_MAPPING = Object.keys(CURRENCY_MAPPING)

  const convertedAmount = useMemo(() => {
    const mapResult = {}

    for (let i = 0; i < ARRAY_MAPPING.length; i++) {
      const currentCurr = ARRAY_MAPPING[i]
      mapResult[currentCurr] = (CURRENCY_MAPPING[currentCurr] / CURRENCY_MAPPING[fromCurr]) * (inputValue || 0);
    }

    return mapResult
  }, [inputValue, fromCurr, CURRENCY_MAPPING])

  const result = convertedAmount[toCurr]
  const formattedResult = result.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return (
    <div className="converter-card">
      <div className="card-header">
        <h1 className="title">Currency Converter</h1>
        <p className="subtitle">Real-time exchange rates</p>
      </div>

      <div className="input-section">
        <label htmlFor='amount-input' className="input-label">Amount ({fromCurr})</label>
        <div className="input-wrapper">
          <input type='number' id='amount-input' className="amount-input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        </div>
      </div>

      <div className="selectors-container">
        <CurrencySelect title='From' mapping={ARRAY_MAPPING} val={fromCurr} setter={setFromCurr} />
        <div className="swap-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3-4 4 4 4" /><path d="M20 7H4" /><path d="m8 21 4-4-4-4" /><path d="M4 17h16" /></svg>
        </div>
        <CurrencySelect title='To' mapping={ARRAY_MAPPING} val={toCurr} setter={setToCurr} />
      </div>

      <div className="result-container">
        <p className="result-label">Converted Amount</p>
        <h2 className="result-amount">
          {formattedResult} <span className="result-currency">{toCurr}</span>
        </h2>
      </div>
    </div>
  );
}
