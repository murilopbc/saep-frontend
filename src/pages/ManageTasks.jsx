import axios from "axios";
import Navbar from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageTasks = () => {

    const [taskStatus, setTaskStatus] = useState([]);
    const [data, setData] = useState(null);
    const [doTasks, setToDoTasks] = useState(null);
    const [doingTasks, setDoingTasks] = useState(null);
    const [doneTasks, setDoneTasks] = useState(null);
    const navigate = useNavigate();





    useEffect(() => {
        const fetchToDoTasks = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/tasks/do');
                setToDoTasks(response.data);
                console.log("A Fazer", response.data);
            } catch (erro) {
                console.log("nao achei")
            }

        };

        fetchToDoTasks();
    }, []);



    useEffect(() => {
        const fetchDoingTasks = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/tasks/doing');
                setDoingTasks(response.data);
                console.log("Fazendo",response.data);
            } catch (erro) {
                console.log("nao achei")
            }

        };

        fetchDoingTasks();
    }, []);

    useEffect(() => {
        const fetchDoneTasks = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/tasks/done');
                setDoneTasks(response.data);
                console.log("Feito",response.data);
            } catch (erro) {
                console.log("nao achei")
            }

        };

        fetchDoneTasks();
    }, []);

    useEffect(() => {
        const fetchTaskStatus = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/tasks/status');
                setTaskStatus(response.data.body);
                console.log(response.data.body);

            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        fetchTaskStatus();
    }, []);


    const handleEditTask = (id) => {
        navigate(`/tasks/${id}/update`);
    };

    const handleDeleteTasks = async (id) => {
        try {
            await axios.delete(`http://localhost:9000/api/tasks/${id}`);
            setData(prevData => prevData.filter(item => item.id !== id));

        } catch (erro) {
            console.log("Erro ao excluir os dados:", erro);
        }
    };




    return (
        <>
      <Navbar />
      <div className="tasks-container">
        <h2>A Fazer</h2>
        <div className="tasks-list">
          {doTasks && doTasks.map((item) => (
            <div className="task-card" key={item.id}>
              <div className="task-details">
                <p><strong>Descrição:</strong> {item.task_description}</p>
                <p><strong>Setor:</strong> {item.sector}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Prioridade:</strong> {item.priority}</p>
                <p><strong>Usuário:</strong> {item.user.name}</p>
              </div>
              <div className="task-actions">
                <button className="btn edit" onClick={() => handleEditTask(item.id)}>Editar</button>
                <button className="btn delete" onClick={() => handleDeleteTasks(item.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tasks-container">
        <h2>Fazendo</h2>
        <div className="tasks-list">
          {doingTasks && doingTasks.map((item) => (
            <div className="task-card" key={item.id}>
              <div className="task-details">
                <p><strong>Descrição:</strong> {item.task_description}</p>
                <p><strong>Setor:</strong> {item.sector}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Prioridade:</strong> {item.priority}</p>
                <p><strong>Usuário:</strong> {item.user.name}</p>
              </div>
              <div className="task-actions">
                <button className="btn edit" onClick={() => handleEditTask(item.id)}>Editar</button>
                <button className="btn delete" onClick={() => handleDeleteTasks(item.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tasks-container">
        <h2>Pronto</h2>
        <div className="tasks-list">
          {doneTasks && doneTasks.map((item) => (
            <div className="task-card" key={item.id}>
              <div className="task-details">
                <p><strong>Descrição:</strong> {item.task_description}</p>
                <p><strong>Setor:</strong> {item.sector}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Prioridade:</strong> {item.priority}</p>
                <p><strong>Usuário:</strong> {item.user.name}</p>
              </div>
              <div className="task-actions">
                <button className="btn edit" onClick={() => handleEditTask(item.id)}>Editar</button>
                <button className="btn delete" onClick={() => handleDeleteTasks(item.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
    )
}

export default ManageTasks;