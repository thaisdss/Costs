import { Message } from "../../components/Layout/Message";
import { Container } from "../../components/Layout/Container";
import { LinkButton } from "../../components/Layout/LinkButton";
import { useLocation } from "react-router-dom";
import "./style.css";
import { ProjectCard } from "../../components/Project/ProjectCard";
import { useState, useEffect } from "react";

export function Projects() {
    const [projects, setProjects] = useState([]);

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
            .then(data => setProjects(data))
            .catch(err => console.log(err))
    }, [])

    return(
        <div className="project_container">
            <div className="title_container">
                <h1>Meus Projetos</h1>
                <LinkButton  to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="sucess" msg={message} />}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard
                        key={project.id}
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        />
                    ))
                }
            </Container>
        </div>
    );
}