import './CurrencySelect.css'

export default function CurrencySelect({ mapping, title, val, setter }) {
    return (
        <div className="currency-select-group">
            <label className="select-label">{title}</label>
            <select className="currency-dropdown" value={val} onChange={(e) => setter(e.target.value)}>
                {
                    mapping.map((element) => (
                        <option key={element} value={element}>{element}</option>
                    ))
                }
            </select>
        </div>
    );
}