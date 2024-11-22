import axios from "axios";
import Navbar from "../components/Header";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';


const UpdateTask = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        task_description: '',
        sector: '',
        priority: '',
        taskStatus: '',
        user: '',

    });
    const [taskStatus, setTaskStatus] = useState([]);
    const [taskPriority, setTaskPriority] = useState([]);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTaskPriority = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/tasks/priority');
                setTaskPriority(response.data.body);
                console.log(response.data.body);

            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        fetchTaskPriority();
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

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/tasks/${id}`);
                setFormData(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        fetchTasks();
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/users');
                setUsers(response.data);
                console.log(response.data);

            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        };

        fetchUsers();
    }, []);



    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = {
            task_description: formData.task_description,
            sector: formData.sector,
            priority: formData.priority,
            taskStatus: formData.taskStatus,
            user: formData.user,
        };

        try {
            const response = await axios.patch(
                `http://localhost:9000/api/tasks/${id}`,
                data,
                {
                    headers: {
                        'Content-Type': 'application/json', // Define o tipo do conteúdo
                    },
                }
            );

            if (response.status === 200) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Tarefa atualizada com sucesso!',
                    showConfirmButton: false,
                    timer: 1500,
                });

                navigate('/tasks');
            } else {
                throw new Error(response.data.message || 'Falha ao salvar os dados.');
            }
        } catch (error) {
            let errorMessage = 'Ocorreu um erro ao atualizar atividade. Tente novamente.';
            if (error.response) {
                switch (error.response.status) {
                    case 409:
                        errorMessage = 'Atividade já cadastrada no sistema.';
                        break;
                    case 400:
                        errorMessage = 'Dados inválidos. Verifique as informações e tente novamente.';
                        break;
                    case 500:
                        errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
                        break;
                    default:
                        errorMessage = error.response.data.message || errorMessage;
                        break;
                }
            }
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: errorMessage,
            });
        }
    };


    return (
        <>
            <Navbar />
            <div>
                {formData ? (
                    <form onSubmit={handleUpdate}>
                        <h2>Atualizar Tarefa</h2>

                        <div>
                            <label>Descrição</label>
                            <input
                                type="text"
                                id="nome"
                                name="task_description"
                                value={formData.task_description}

                                required
                            />
                        </div>

                        <div>
                            <label>Setor</label>
                            <input
                                type="text"
                                id="setor"
                                name="sector"
                                value={formData.sector}

                                required
                            />
                        </div>




                        <div>
                            <label>Usuário</label>
                            <select
                                id="users"
                                value={formData.user || ""} // Apenas o ID do usuário
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        user: e.target.value, // Atualiza o ID diretamente
                                    })
                                }
                                required
                            >
                                <option value="">Selecione um usuário</option>
                                {users.map((usuario) => (
                                    <option key={usuario.id} value={usuario.id}>
                                        {usuario.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label>Status</label>
                            <select

                                id="status"
                                value={formData.taskStatus}
                                onChange={(e) => setFormData({ ...formData, taskStatus: e.target.value })}
                                required
                            >
                                <option>Selecione o status</option>
                                {taskStatus.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>



                        <div>
                            <label>Prioridade</label>
                            <select

                                id="prioridade"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                required
                            >
                                <option>Selecione a prioridade</option>
                                {taskPriority.map((prioridade) => (
                                    <option key={prioridade} value={prioridade}>
                                        {prioridade}
                                    </option>
                                ))}
                            </select>
                        </div>



                        <button type="submit">Atualizar</button>
                    </form>
                ) : (
                    <p>Carregando as informações</p>
                )}
            </div>
        </>
    )
}

export default UpdateTask;