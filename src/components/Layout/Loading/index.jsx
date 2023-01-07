import "./style.css";
import loading from "../../../assets/loading.svg";

export function Loading() {
    return(
        <div className="loader_container">
            <img src={loading} alt="Loading" className="loader" />
        </div>
    );
}