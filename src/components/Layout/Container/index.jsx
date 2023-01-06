import "./style.css";

export function Container(props) {
    return <div className={`container ${props.customClass}`}>{props.children}</div>;
}