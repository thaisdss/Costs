import { Message } from "../../components/Layout/Message";
import { Container } from "../../components/Layout/Container";
import { LinkButton } from "../../components/Layout/LinkButton";
import { useLocation } from "react-router-dom";
import "./style.css";
import { ProjectCard } from "../../components/Project/ProjectCard";
import { useState, useEffect } from "react";
import { Loading } from "../../components/Layout/Loading";

export function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState("");

    const location = useLocation();
    let message = "";

    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch("http://localhost:5000/projects", {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then((data) => {
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch(err => console.log(err))
    }, [])

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(() => {
                setProjects(projects.filter(project => project.id !== id));
                setProjectMessage("Projeto removido com sucesso");

                setTimeout(() => {
                    setProjectMessage("")
                }, 3000)
            })
            .catch((err) => console.log(err))
    }

    return(
        <div className="project_container">
            <div className="title_container">
                <h1>Meus Projetos</h1>
                <LinkButton  to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!</p>
                )}
            </Container>
        </div>
    );
}