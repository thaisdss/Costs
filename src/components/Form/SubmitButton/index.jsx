import "./style.css";

export function SubmitButton({text}) {
    return(
        <div>
            <button className="btn">{text}</button>
        </div>
    );
}