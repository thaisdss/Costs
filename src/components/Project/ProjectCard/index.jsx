import "./style.css";
import { BsPencil, BsFillTrashFill } from "react-icons/bs"
import { Link } from "react-router-dom";

export function ProjectCard({id, name, budget, category, handleRemove}) {
    const remove = (e) => {
        e.preventDefault();

        handleRemove(id)
    }

    return(
        <div className="project_card">
            <h4>{name}</h4>
            <p><span>Orçamento:</span> R${budget}</p>
            <p className="category_text">
                <span className={category.toLowerCase()}></span> 
                {category}
            </p>
            <div className="project_card_actions">
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div>
    );
}