import { useNavigate } from "react-router-dom";
import { ProjectForm } from "../../components/Project/ProjectForm";
import "./style.css";

export function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        //inicialize cost and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)

                //redirect
                navigate("/projects", { state: { message: "Projeto criado com sucesso!" } })
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="newproject_container">
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serivços</p>
            <ProjectForm  handleSubmit={createPost} btnText="Criar Projeto" />
        </div>
    );
}