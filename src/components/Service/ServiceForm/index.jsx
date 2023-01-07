import { useState } from "react";
import { Input } from "../../Form/Input";
import { SubmitButton } from "../../Form/SubmitButton";
import "../../Project/ProjectForm/style.css";

export function ServiceForm({handleSubmit, btnText, projectData}) {
    const [service, setService] = useState({});

    function submit(e) {
        e.preventDefault();

        projectData.services.push(service);
        handleSubmit(projectData);
    }

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value })
    }

    return(
        <form onSubmit={submit} className="form">
            <Input 
            type="text"
            text="Nome do Serviço"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange}
            />
            <Input 
            type="number"
            text="Custo do Serviço"
            name="cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}
            />
            <Input 
            type="text"
            text="Descrição do Serviço"
            name="description"
            placeholder="Descreva o serviço"
            handleOnChange={handleChange}
            />

            <SubmitButton  text={btnText} />
        </form>
    );
}