import "./style.css";
import { useParams } from "react-router-dom";
import { parse, v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { Loading } from "../../components/Layout/Loading";
import { Container } from "../../components/Layout/Container";
import { ProjectForm } from "../../components/Project/ProjectForm";
import { ServiceForm } from "../../components/Service/ServiceForm";
import { ServiceCard } from "../../components/Service/ServiceCard";
import { Message } from "../../components/Layout/Message";

export function Project() {
    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json",
            },
        })
            .then(response => response.json())
            .then((data) => {
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
    }, [id])

    function editPost(project) {
        setMessage("");

        if(project.budget < project.cost) {
            setMessage("O orçamento não pode ser menor que o custo do projeto!")
            setType("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project),
        })
            .then(response => response.json())
            .then((data) => {
                setProject(data)
                toggleProjectForm()

                setMessage("Projeto atualizado com sucesso!")
                setType("success")
            })
            .catch(err => console.log(err))
    }

    function createService(project) {
        setMessage("");

        //last service
        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // maximum value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage("Orçamento ultrapassado, verifique o valor do serviço");
            setType("error");
            project.services.pop();
            return false
        }

        // add service cost to project total cost
        project.cost = newCost

        //update project
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(project)
        })
            .then(response => response.json())
            .then(() => toggleServiceForm())
            .catch(err => console.log(err))
    }

    function removeService(id, cost) {
        setMessage("");

        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdated
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectUpdated)
        })
            .then(response => response.json())
            .then(() => {
                setProject(projectUpdated);
                setServices(servicesUpdated);

                setMessage("Serviço excluído com sucesso!");
                setType("success");
            })
            .catch(err => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return(
        <>
            {project.name ? 
            <div className="project_details">
                <Container customClass="column">
                    {message && <Message type={type} msg={message} />}
                    <div className="details_container">
                        <h1>Projeto: {project.name}</h1>
                        <button onClick={toggleProjectForm} className="btn">
                            {!showProjectForm ? "Editar Projeto" : "Fechar"}
                        </button>
                        {!showProjectForm ? (
                            <div className="project_info">
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de Orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> R${project.cost}
                                </p>
                            </div>
                        ) : (
                            <div className="project_info">
                                <ProjectForm 
                                handleSubmit={editPost}
                                btnText="Concluir Edição"
                                projectData={project}
                                />
                            </div>
                        )}
                    </div>

                    <div className="service_form_container">
                        <h2>Adicione um serviço</h2>
                        <button onClick={toggleServiceForm} className="btn">
                            {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
                        </button>
                        <div className="project_info">
                            {showServiceForm && (
                                <ServiceForm 
                                handleSubmit={createService}
                                btnText="Adicionar Serviço"
                                projectData={project}
                                />
                            )}
                        </div>
                    </div>

                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 && 
                            services.map((service) => (
                                <ServiceCard
                                key={service.id}
                                id={service.id}
                                name={service.name}
                                cost={service.cost}
                                description={service.description}
                                handleRemove={removeService}
                                />
                            ))
                        }
                        {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                    </Container>
                </Container>
            </div>
            :  <Loading />  
            }
        </>
    );
}