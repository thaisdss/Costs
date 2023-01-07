import "./style.css";

export function Select({ text, name, options, handleOnChange, value }) {
    return(
        <div className="form_control">
            <label htmlFor={name}>{text}</label>
            <select 
            name={name} 
            id={name} 
            onChange={handleOnChange} 
            value={value || ""}
            >
                <option>Selecione uma opção</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    );
}