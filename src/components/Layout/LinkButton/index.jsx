import { Link } from "react-router-dom";
import "./style.css";

export function LinkButton({to, text}) {
    return(
        <Link to={to} className="btn">{text}</Link>
    );
}